//creating an action that will load our songs to the server component 

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

const getLikedSongs =  async(): Promise<Song[]> => {
    //creating the server component supabase client
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    //getting the session

    const { 
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)') //our key (songs) has a relation to public songs Id
        .eq('user_id', session?.user?.id) //the ones we're selecting should be equal to user_id and the session user?.id
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error.message);
        return []; 
    }

    //if their is no data we'll also return an empty array

    if (!data) {
        return [];
    }

    return data.map((item) => ({ //we're spreading a relation that we've populated with this one song that we'll be loading in each of these fields
        ...item.songs
    }));
}; 

export default getLikedSongs;