"use client";

import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {

    //checking if their are no songs
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available
            </div>
        )
    }

    return ( 
        <div>
            Page Content
        </div>
     );
}
 
export default PageContent;