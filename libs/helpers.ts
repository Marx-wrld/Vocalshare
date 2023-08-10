import { Price } from "@/types";

//creating a function that will fetch our url depending on whether we're in production, localhost or deployed elsewhere

export const getUrl = () => {
    let url = 
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'https://localhost:3000/';

    //code to confirm that the url that we passed, just in case we change it includes https
    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`; //if the last character is a slash then just return the url, otherwise add a slash to the end of the url

    return url;

};