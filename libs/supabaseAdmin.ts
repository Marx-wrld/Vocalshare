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

export const upsertProductRecord = async (product: Stripe.Product) => {
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