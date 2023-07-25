import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    //checking if we have a song

    if(!song){
        return null;
    }

    //else

    const { data: imageData } = supabaseClient
    .storage
    .from('images') //our bucket
    .getPublicUrl(song.image_path);

    return imageData.publicUrl;
}

export default useLoadImage;