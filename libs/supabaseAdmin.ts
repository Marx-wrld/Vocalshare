//creating our supabase admin

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types_db";
import { Price, Product } from "@/types";
import { stripe } from "./stripe";
import { toDateTime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

//Configuring our webhook so that when we add a new product in stripe, it will be inserted in the db

const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? undefined,
        image: product.images?.[0] ?? null,
        metadata: product.metadata
    };

    //upserting our product into supabase
    const { error } = await supabaseAdmin 
        .from('products').upsert([productData]);
    
        //incase of an error throw error
    if(error){
        throw error;
    }

    console.log(`Product inserted/updated successfully: ${product.id}`);
};

//This second function will be used to insert the price into the db

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata
    }
    const { error } = await supabaseAdmin
        .from('prices')
        .upsert([priceData]);
    if (error) {
        throw error;
    }
    console.log(`Price inserted/updated successfully: ${price.id}`);
};

//function to create or retrieve a customer

const createOrRetrieveCustomer = async ({
    email,
    uuid
}: {
    email: string,
    uuid: string
}) => {
    const { data, error } = await supabaseAdmin
        .from('customers') //table customers
        .select('id, stripe_customer_id') //finding stripe customer id
        .eq('id', uuid) // retrieving this id
        .single(); //retrieving a single record

    //This section happens only if we have no active customer

    //if there's an error or no stripe customer id then we'll go ahead and create one
    if (error || !data?.stripe_customer_id) {
        const customerData: { metadata: { supabaseUUID: string }; email?: string } = {
            metadata: {
                supabaseUUID: uuid
            }
        };

        if (email) customerData.email = email;

        const customer = await stripe.customers.create(customerData);
        
        //extracting the error from supabase
        const { error: supabaseError } = await supabaseAdmin
            .from('customers')
            .insert([{ id: uuid, stripe_customer_id: customer.id }])

        //checking if there is a supabase error
        if (!supabaseError) {
            throw supabaseError; 
        }

        console.log(`New customer created and inserted for ${uuid}`)
        return customer.id;
    };

    //If we manage to load a customer(if the person was on a plan in the past)

    return data.stripe_customer_id;

};

//Function to copy billing details to customer

const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    //customer variables
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;

    if(!name || !phone || !address ) return;

    // @ts-ignore
    await stripe.customers.update(customer, { name, phone, address });

    const { error } = await supabaseAdmin
        .from('users')
        .update({
            billing_address: { ...address },
            payment_method: { ...payment_method[payment_method.type] }
        })
        .eq('id', uuid);
    
    //if there's an error throw error
    if (error) throw error;
};

//Function to manage subscriptions status changes

const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    const { data: customerData, error: noCustomerError } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();
    
    //if we get a no customer error
    if (noCustomerError) throw noCustomerError;

    //Otherwise we go ahead and extract the id
    const { id: uuid } = customerData!; //the exclamation mark at the end helps fix any type errors

    //retrieving a subscription from stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId,
        {
            expand: ["default_payment_method"]
        });

    //creating a subscription data that we'll use to update the subscription
    const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] = {
        //stripe webhooks
        id: subscription.id,
        user_id: uuid,
        metadata: subscription.metadata,
        // @ts-ignore
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        // @ts-ignore
        quantity: subscription.quantity,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
        canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
        current_period_start: toDateTime(subscription.current_period_start).toISOString(),
        current_period_end: toDateTime(subscription.current_period_end).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
        trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
        trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
    };

    //inserting into the database
    const { error } = await supabaseAdmin
        .from('subscriptions')
        .upsert([subscriptionData]);

    //incase of an error
    if (error) throw error;

    console.log(`Inserted/Updated subscription [${subscription.id} for ${uuid}]`);

    if (createAction && subscription.default_payment_method && uuid) {
        await copyBillingDetailsToCustomer(
            uuid,
            subscription.default_payment_method as Stripe.PaymentMethod
        )
    }
};

//exporting all our functions and data

export {
    upsertProductRecord,
    upsertPriceRecord,
    createOrRetrieveCustomer,
    manageSubscriptionStatusChange
}