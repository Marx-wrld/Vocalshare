"use client";

import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";
import UploadModal  from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

//creating props to accept products when passing ModalProvider in the layout
interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
    const [isMounted, setIsMounted] = useState(false); 
    
    //since we're doing server side rendering, modals can cause hydration errors, to prevent that, we never want to render a model if we are in server side

    useEffect(() => {
        setIsMounted(true);
    }, []);
    //Changes isMounted to true once its loaded. If this useEffect error loads, that means that we're already in the client and we can safely show our modals

    if(!isMounted){
        return null;
    }
    //we're ensuring that none of the modals can be seen during server side rendering

    return ( 
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products}/>
        </>
     );
}
 
export default ModalProvider;