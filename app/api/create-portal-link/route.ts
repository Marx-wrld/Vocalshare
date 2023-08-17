//wrapping up our portal link

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(){
    try{ 
        const supabase = createRouteHandlerClient({ //creating our supabase client
            cookies
        });

        const { data: { user } } = await supabase.auth.getUser(); //extracting data anad user from data object

        if (!user) throw Error('User not found'); //if user is not found, throw an error

        //else

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || ''
        });

        if (!customer) throw Error('Customer not found'); //if customer is not found, throw an error

        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`,
        }); //Now we're able to create our subscription link and our portal link where users can remove their subscription if they want to and they will be tied to the account

        return NextResponse.json({ url });
    } catch (error: any) {
        console.log(error);
        new  NextResponse('Internal Error', {status: 500 });
    };
}
