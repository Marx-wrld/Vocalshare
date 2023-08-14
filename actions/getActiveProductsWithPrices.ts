//creating an action that will load our songs to the server component 

import { ProductWithPrice, Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    //creating the server component supabase client
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}; 

export default getActiveProductsWithPrices;