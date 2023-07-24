"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

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
        <div>
            Song Item
        </div>
     );
}
 
export default SongItem;