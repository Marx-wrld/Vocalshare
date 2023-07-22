"use client";

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useUploadModal from "@/hooks/useUploadModal";
import { useState } from 'react';
import Input from './Input';

const UploadModal = () => {

    const [isLoading, setIsLoading] = useState();

    const uploadModal = useUploadModal(); //We don't want our upload Modal content to always remain open on the screen 
    
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
        //Upload to supabase
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
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    {...register("title", {required: true})} //spreads a bunch of props and attributes that we need for this input e.g - onChange, onBlur
                    placeholder="Song title"
                />
            </form>
        </Modal>
     );
}
 
export default UploadModal;