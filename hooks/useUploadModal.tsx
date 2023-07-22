import { create } from "zustand";

interface UploadModalStore { // this is the type of the store
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUploadModal = create<UploadModalStore>((set) => ({ 
    // this is the store itself
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),

}));


export default useUploadModal;