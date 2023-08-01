//We've been fetching songs using server components using hooks
//supabase now allows us to fetch songs from the client components

import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>();
    const {supabaseClient} = useSessionContext(); //Both authenticated and unauthenticated users have read access to our page but if we were to allow only authenticated users to have access to our page then we use the above method

    useEffect(() => {

        if(!id) {
            return;
        }

        setIsLoading(true);

        const fetchSong = async () => {
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single();

            //checking if there is an error
            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong(data as Song);
            setIsLoading(false);
        }

        fetchSong();

    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
}

export default useGetSongById;
