"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    //creating our onPlay next function
    const onPlayNext = () => {
        //checking if their is an active array of songs to play
        if (player.ids.length === 0) {
            return; //breaking the function
        }

        //else
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        
        //next song to play
        const nextSong = player.ids[currentIndex + 1];

        //checking if their is a next song to play
        //if our song is the last in the playlist we'll rest the playlist so that the first song is played
        if (!nextSong){
            return player.setId(player.ids[0]);
        }
        
        //otherwise
        player.setId(nextSong);
    };

    const onPlayPrevious = () => {
        //checking if their is an active array of songs to play
        if (player.ids.length === 0) {
            return; //breaking the function
        }

        //else
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        
        //previous song to play
        const previousSong = player.ids[currentIndex - 1];

        //checking if their is a previous song to play
        //This is going to help us to play the last song in the playlist
        if (!previousSong){
            return player.setId(player.ids[player.ids.length - 1]);
        }
        
        //otherwise
        player.setId(previousSong);
    };
    
    //Playing our songs
    const [play, { pause, sound }] = useSound(
        songUrl, //Linked with the key songUrl in Player
        {
            volume: volume,
            onplay: () => setIsPlaying(true), //for the play button
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false), //for the pause button
            format: ['mp3']
        }
    );

    //creating a useEffect that automatically plays the song when the player component loads
    useEffect(() => {
        sound?.play();

        return() => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        //if we're not playing then go ahead and play the song
        if (!isPlaying){
            play();
        }
        else {
            pause();
        }
    };

    const toggleMute = () => { // toggle muted state of the player

        if (volume === 0) {
            setVolume(1);
        } 
        else {
            setVolume(0);
        }
    };

    return ( 
        <div className="
                grid
                grid-cols-2
                md:grid-cols-3
                h-full
        ">
            <div className="
                    flex
                    w-full
                    justify-start
            ">
                <div className="
                        flex
                        items-center
                        gap-x-4
                ">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="
                    flex
                    md:hidden
                    col-auto
                    w-full
                    justify-end
                    items-center
            ">
                <div 
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6 
            ">
                <AiFillStepBackward 
                        onClick={onPlayPrevious}
                        size={30}
                        className="
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition   
                        "
                />
                <div onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                     "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward 
                    onClick={onPlayNext}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>

            <div className="
                    hidden
                    md:flex
                    w-full
                    justify-end
                    pr-2
            ">
                <div className="
                        flex
                        items-center
                        gap-x-2
                        w-[120px]
                ">
                    <VolumeIcon 
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider 
                    //Props for our slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default PlayerContent;
