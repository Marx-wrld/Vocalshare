import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongByUrl = (song: Song) => {
    const supabaseClient = useSupabaseClient();
    //for now both authenticated and unauthenticated users have access to our page but if we were to only allow authenticated users then we'd use "const {supabaseClient} = useSessionContext();"

    //if there is no song we'll return an empty string
    
    if(!song){
        return '';
    }

    //else

    const { data: songData } = supabaseClient
        .storage
        .from('songs')
        .getPublicUrl(song.song_path);

    return songData.publicUrl;
}

export default useLoadSongByUrl;
