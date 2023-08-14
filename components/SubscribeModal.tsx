"use client";

import { ProductWithPrice } from "@/types";
import Modal from "./Modal";

//creating props for products so that we can pass products to the SubscribeModal in ModalProvider
interface SubscribeModalProps {
    products: ProductWithPrice[];
}


const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {
    let content = (
        <div className="text-center">
            No products available
        </div>
    );

    return ( 
        <Modal 
            title="Only for Premium Users"
            description="Listen to music with Vocalshare Premium"
            isOpen
            onChange={() => {}}        
        >
            {content}
        </Modal>
     );
}
 
export default SubscribeModal;