"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs); //creates a playlist out of the currently playing songs

    //checking if their are no songs
    if (songs.length === 0) {
        return (
            <div className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
            ">
                No songs available
            </div>
        )
    }

    return ( 
        <div className="
                flex
                flex-col
                gap-y-2
                w-full
                px-4
        ">
            {songs.map((song: Song) => (
                <div 
                    key={song.id}
                    className="
                        flex 
                        items-center 
                        gap-x-4 
                        w-full
                    "
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
     );
}
 
export default SearchContent;