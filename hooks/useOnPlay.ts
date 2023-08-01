import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer"
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer(); //getting the player
    const authModal = useAuthModal(); //getting the auth modal
    const { user } = useUser(); //getting the user

    const onPlay = (id: string) => { 

        //if there's no user and its neccessary to pass the authModal.onOpen function so that even the not logged in users can play music
        if(!user){
            return authModal.onOpen();
        }

        player.setId(id); //set the player to the player    object that will be used to play the music
        player.setIds(songs.map((song) => song.id)); //creates the playlist
    };

    return onPlay;
}

export default useOnPlay;