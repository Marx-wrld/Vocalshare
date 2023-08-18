//Adding a delay so that it waits till the user stops typing (500 milliseconds) thats when we fetch the songs

import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value); //initializing the debounced value to the value

    useEffect(() => {
        const timer = setTimeout(() => { //setting a timer
            setDebouncedValue(value); //setting the debounced value to the value
        }, delay || 500); //setting the delay to 500 milliseconds

        return () => { //returning a function that will clear the timer
            clearTimeout(timer);
        }
    }, [value, delay]); //setting the dependencies

    return debouncedValue; //returning the debounced value
}

export default useDebounce; //exporting the hook