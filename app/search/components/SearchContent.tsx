"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {

    //checking if their are no songs
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
            {songs.map((song) => (
                <div 
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={() => {}}
                            data={song}
                        />
                    </div>
                    {/* Add like button here */}
                </div>
            ))}
        </div>
     );
}
 
export default SearchContent;