"use client";

import Modal from './Modal';
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {

    const uploadModal = useUploadModal(); //We don't want our upload Modal content to always remain open on the screen 
    
    const onChange = (open: boolean) => {
        if(!open){
            //we'll add the code to reset the form later
            uploadModal.onClose();
        }
    }

    return ( 
        <Modal
            title="Upload content"
            description="Upload modal description"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            Upload content
        </Modal>
     );
}
 
export default UploadModal;