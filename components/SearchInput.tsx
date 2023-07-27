"use client";

import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {

    const router = useRouter(); //we'll use this to push the url
    const [value, setValue] = useState<string>(''); //we'll use this to store the value of the input
    const debouncedValue = useDebounce(value, 500); //we'll use this to debounce the value of the input

    useEffect(() => { //fetchs our data
        const query = {
            title: debouncedValue,
        }

        const url = qs.stringifyUrl({ //we'll use this to create the url
            url: '/search',
            query: query
        })

        router.push(url);

    }, [debouncedValue, router]);

    return ( 
        <Input 
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
     );
}
 
export default SearchInput;

