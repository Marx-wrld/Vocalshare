"use client";

import { TbPlaylist }from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";


interface LibraryProps { 
    songs: Song[]; //songs has a type of Song which is an array
}

const Library: React.FC<LibraryProps> = ({
    songs //extracting the songs 
}) => {

    const authModal = useAuthModal(); 

    const uploadModal = useUploadModal();

    const { user } = useUser();

    const onClick = () => {
       if (!user) {
       return authModal.onOpen();

       }
       //Will add code to handle subscription after integrating stripe and if no subscription will trigger the subscription modal which we will build

       return uploadModal.onOpen();
    };

    return(
        <div className="flex flex-col">
            <div className="
                flex
                items-center
                justify-column
                px-5
                pt-4"
            >
                 <div className="
                    inline-flex
                    items-center
                    gap-x-2
                 ">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400
                                font-medium
                                text-md">
                                    Your Library
                    </p>
                 </div> 
                 <AiOutlinePlus 
                    onClick={onClick} //will later handle uploading of songs
                    size={20}
                    className="
                        text-neutral-400
                        mx-12
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                 />
            </div>
            <div className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
            >
                {songs.map((item) => {
                    <div>
                        <MediaItem 
                                onClick={() => {}}
                                key={item.id}
                                data={item}
                        />
                    </div>
                })}
            </div>
        </div>
    )
} 

export default Library;
