"use client";

import Modal from "./Modal";

const SubscribeModal = () => {
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