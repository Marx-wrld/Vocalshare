"use client";

import { TbPlaylist }from "react-icons/tb";

const Library = () => {
    const onClick = () => {
        //Will later handle uploading of songs
    };
    return(
        <div className="flex flex-col">
            <div className="
                flex
                items-center
                justify-column
                px-5
                pt-4">
                 <div className="
                    inline-flex
                    items-center
                    gap-x-2
                 ">
                    <TbPlaylist />
                 </div>
            </div>
        </div>
    )
} 

export default Library;