"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

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
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
        ">
            <PlayerContent 
                key={songUrl} //we'll be using playlist and we want to enable users to skip to the next song."Whenever the key attribute changes it completely destroys the element that was using it and rerenders a completely new element"The hook that we're using does not support dynamic and modular url changes
                song={song}
                songUrl={songUrl}    
            />
        </div>
     );
}
 
export default Player;