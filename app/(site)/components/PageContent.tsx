"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {

    //reusing our onPlay hook to every song property in order to create the playlist
    const onPlay = useOnPlay(songs);

    //checking if their are no songs
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available
            </div>
        )
    }

    return ( 

        //rendering our songs in grid format
        <div className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
        ">
            {/* Iterating over our songs */}
            {songs.map((item) => (
                <SongItem 
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
     );
}
 
export default PageContent;
