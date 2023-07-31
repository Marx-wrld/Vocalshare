"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {

    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    //Adding a useEffect to check whether the song that I'm currently loading has been liked or not
    useEffect(() => {
        if(!user?.id) { //checking if their is a user id
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            if(!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();

    }, [songId, user?.id, supabaseClient]);

    //Dynamically rendering the icon depending on whether the song has been liked or not

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if(!user){
            return authModal.onOpen(); //if we are logged out and we attempt to click the like button, it pops the authModal
        }

        //if the song has been liked, we want to unlike it and if it hasn't been liked, we want to like it
        if (isLiked) {
            const { error } = await supabaseClient //extracting the error from supabaseClient and removing the like from the db
                .from("liked_songs")
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } 
        else {
            const { error } = await supabaseClient //extracting the error from supabaseClient and adding the like to the db
                .from("liked_songs")
                .insert({
                    user_id: user.id,
                    song_id: songId
                });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Liked!");
            }
        }

        router.refresh();   

    }

    return (
        <button onClick={handleLike} 
                className="
                  hover:opacity-75
                  transition
        ">
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
     );
}
 
export default LikeButton;