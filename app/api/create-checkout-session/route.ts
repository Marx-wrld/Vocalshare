//route that creates our checkout session

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST (
    request: Request
) {
    //body of our product which we're going to subscribe to
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        const supabase = createRouteHandlerClient({
            cookies
        });

        //extracting our data
        const { data: { user } } = await supabase.auth.getUser();
        
        //creating our customer
        const customer  = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || '',
        });

        //creating our checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            customer,
            line_items: [
                {
                price: price.id,
                quantity,
            }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
                trial_from_plan: true,
                metadata
        },
        success_url: `${getUrl()}/account`,
        cancel_url: `${getUrl()}/`
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    };
};