"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
    //fetching the song using the id assigned in player store as an activeId
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    //creating a hook to load the song

    const songUrl = useLoadSongUrl(song!);

    //if no song, url or player
    //This is basically a protection that we don't want to load the player if we don't have the song 
    if (!song || !songUrl || !player.activeId){
        return null;
    }
    //else

    return ( 
        <div className="
                fixed
                button-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
        ">
            Player
        </div>
     );
}
 
export default Player;