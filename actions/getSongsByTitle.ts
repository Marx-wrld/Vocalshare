 //creating an action that will load our songs to the server component 

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import getSongs from "./getSongs";

const getSongsByTitle =  async(title: string): Promise<Song[]> => {
    //creating the server component supabase client
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    //checking if their is no title
    if(!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`) //ilike is a case insensitive like that will search for the title in the database in a precise algorithm
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}; 

export default getSongsByTitle;