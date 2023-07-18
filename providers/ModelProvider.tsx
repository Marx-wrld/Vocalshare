"use client";

import { useEffect, useState } from "react";

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false); 
    
    //since we're doing server side rendering, models can cause hydration errors, to prevent that, we never want to render a model if we are in server side

    useEffect(() => {
        setIsMounted(true);
    }, []);
    //Changes isMounted to true once its loaded. If this useEffect error loads, that means that we're already in the client and we can safely show our models

    if(!isMounted){
        return null;
    }
    //we're ensuring that none of the models can be seen during server side rendering

    return ( 
        <>
            Models
        </>
     );
}
 
export default ModelProvider;