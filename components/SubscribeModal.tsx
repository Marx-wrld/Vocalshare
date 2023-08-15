"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";

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
                    <Button key={price.id}>
                        {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                    </Button>
                ))
                })}
            </div>
        )
    }

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