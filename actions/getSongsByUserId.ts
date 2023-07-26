//creating an action that will load our songs to the server component 

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

const getSongsByUserId =  async(): Promise<Song[]> => {
    //creating the server component supabase client
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: sessionData,
        error: sessionError
    } = await supabase.auth.getSession();

    //checking if their was a session error
    if (sessionError){
        console.log(sessionError.message);
        return []; 
    }

    const { data, error } = await supabase //getting the songs from the database
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false })

    //checking if their was an error
    if (error) {
        console.log(error.message);
    }

    //returning the data
    return (data as any) || [];
}; 

export default getSongsByUserId;