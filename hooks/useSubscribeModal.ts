import { create } from "zustand";

interface SubscribeModalStore { // this is the type of the store
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({ 
    // this is the store itself
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),

}));


export default useSubscribeModal;