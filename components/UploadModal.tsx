"use client";

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useUploadModal from "@/hooks/useUploadModal";
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import uniqid from 'uniqid';

const UploadModal = () => {

    const [isLoading, setIsLoading] = useState(false);

    const uploadModal = useUploadModal(); //We don't want our upload Modal content to always remain open on the screen 
    
    const { user } = useUser();

    const supabaseClient = useSupabaseClient();
    
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null, //song and image will be of type File
            image: null
        }
    });

    const onChange = (open: boolean) => {
        if(!open){
            //reset the form
            reset();
            uploadModal.onClose(); 
            //close the modal if not opened
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => { //values will be the form data
        try {
            setIsLoading(true);
            
            //extracting our image and song files
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user){
                toast.error("Missing fields");
                return; //returns everything after error has been displayed
            }

            const uniqueID = uniqid(); //helps us to safely upload our songs

            //Upload songs

            const {
                data: songData, 
                error: songError,
                //extracting data and error then remapping them to songData and songError, because we'll have multiple data and errors and we'll have to remap them so that they are functional
            } = await supabaseClient
                .storage,
                .from('songs') //starting with our first bucket, as we have bucket for songs and for images
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

                if(songError) {
                    setIsLoading(false);
                    return toast.error('Failed song upload');
                }

                //Upload images
        } 
        
        catch (error) {
            toast.error("Something went wrong");
        } 
        
        finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Modal
            title="Add a song"
            description="Upload mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)} //gets the form data from useForm hook
                className='flex flex-col gap-y-4'
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    {...register("title", {required: true})} //spreads a bunch of props and attributes that we need for this input e.g - onChange, onBlur
                    placeholder="Song title"
                />

                <Input 
                    id="author"
                    disabled={isLoading}
                    {...register("author", {required: true})}
                    placeholder="Song author"
                />

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input 
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", {required: true})}  
                      />
                </div>

                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input 
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", {required: true})}  
                      />
                </div>
                
                <Button
                    disabled={isLoading}
                    type="submit" 
                >
                    Create
                </Button>
                
            </form>
        </Modal>
     );
}
 
export default UploadModal;