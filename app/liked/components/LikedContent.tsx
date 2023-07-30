"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {

    const router = useRouter(); //using this to push our url
    const { isLoading, user } = useUser();


    //ensuring that only authenticated users can access the page /liked

    useEffect(() => {
        if(!isLoading && user){
            router.replace('/');
        }
    }, [isLoading, user, router]);

    //creating a view in case their are no liked songs

    if(songs.length === 0) {
        return (
            <div className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
            ">
                No liked songs
            </div>
        )
    }
    
    return ( 
        <div>
            Liked Content
        </div>
     );
}
 
export default LikedContent;