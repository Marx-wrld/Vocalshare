"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

//creating props for products so that we can pass products to the SubscribeModal in ModalProvider
interface SubscribeModalProps {
    products: ProductWithPrice[];
}

//function to format the price
const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {

    const subscribeModal = useSubscribeModal();
    const { user, isLoading, subscription } = useUser(); //we're getting the user, isLoading and subscription from the useUser hook
    const [priceIdLoading, setPriceIdLoading] = useState<string>(); //we're setting the priceIdLoading to a string

    const onChange = (open: boolean) => {
        if(!open) {
            subscribeModal.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id); //we're setting the priceIdLoading to the price.id
    

        if (!user){
            setPriceIdLoading(undefined);
            return toast.error("Must be Logged in to subscribe");
        }

        if (subscription){
            setPriceIdLoading(undefined);
            return toast.error("Already subscribed");
        }

        try{
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error){
           return toast.error((error as Error)?.message);
        } finally{
            setPriceIdLoading(undefined);
        }
    };

    let content = (
        <div className="text-center">
            No products available
        </div>
    );

    if (products.length){
        content = (
            <div>
                {/* we're mapping through the products and displaying them in the modal */}
                {products.map((product) => {
                    if (!product.prices?.length){
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        );
                    }
                return product.prices.map((price) => (
                    <Button 
                        key={price.id}
                        onClick={() => handleCheckout(price)}
                        disabled={isLoading || price.id === priceIdLoading}
                        className="mb-4"
                        >
                        {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                    </Button>
                ))
                })}
            </div>
        )
    }

    //Adding a modal for user is already subscribed
    if (subscription){
        content = (
            <div className="text-center">
                Already subscribed
            </div>
        )
    }

    return ( 
        <Modal 
            title="Only for Premium Users"
            description="Listen to music with Vocalshare Premium"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}        
        >
            {content}
        </Modal>
     );
}
 
export default SubscribeModal;