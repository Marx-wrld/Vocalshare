"use client";

import { TbPlaylist }from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

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
        
        </div>
    )
} 

export default Library;