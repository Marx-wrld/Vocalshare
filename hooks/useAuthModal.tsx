import { create } from "zustand";

interface AuthModalStore { // this is the type of the store
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({ 
    // this is the store itself
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),

}));


export default useAuthModal;