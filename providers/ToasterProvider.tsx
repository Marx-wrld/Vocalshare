"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return ( 
        <Toaster 
            toastOptions={{
                style: {
                    backgroundColor: '#333',
                    color: '#fff'
                }
            }}
        />
     );
}
 
export default ToasterProvider;