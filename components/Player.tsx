"use client";

import usePlayer from "@/hooks/usePlayer";

const Player = () => {

    const player = usePlayer();

    //fetching the song using the id assigned in player store as an activeId

    return ( 
        <div>
            Player
        </div>
     );
}
 
export default Player;