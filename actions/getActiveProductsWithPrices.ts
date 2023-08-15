//creating an action that will load our songs to the server component 

import { ProductWithPrice } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    //creating the server component supabase client
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true) //choosing only the active ones
        .eq('prices.active', true) //checking if the price is active
        .order('metadata->index') //we order them by metadata index
        .order('unit_amount', { foreignTable: 'prices' }) //we then order them by unit-amount in the foreignTable by prices

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}; 

export default getActiveProductsWithPrices;