"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem:React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    //hook to help us to load an image for our song

    const imagePath = useLoadImage(data);

    return ( 
        <div 
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3
        ">
            <div className="
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
            ">
                <Image 
                    className="object-cover"
                    src={imagePath || "/images/liked.png"}
                    fill
                    alt="Image"
                />
            </div>
        </div>
     );
} 
 
export default SongItem;