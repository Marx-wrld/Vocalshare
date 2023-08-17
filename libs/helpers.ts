//Helpers for our stripe project

import { Price } from "@/types";

//creating a function that will fetch our url depending on whether we're in production, localhost or deployed elsewhere

export const getUrl = () => {
    let url = 
        process?.env?.NEXT_PUBLIC_SITE_URL ??
        process?.env?.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000/';

    //code to confirm that the url that we passed, just in case we change it includes https
    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`; //if the last character is a slash then just return the url, otherwise add a slash to the end of the url

    return url;
};

//2nd helper which is the post data handling our fetch

export const postData = async ({ //passing the url and data
    url,
    data
}: { //type of data they take
    url: string;
    data?: { price: Price }
}) => {
    console.log('POST REQUEST:', url, data); //helps us know what's going on when we post

    const res: Response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json'}),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });
    
    //if the response ok is not there we return an error from post and then showcase url, data and res so that we can debug the error
    if(!res.ok){
        console.log('Error in POST', { url, data, res });

        throw new Error(res.statusText);
        //throwing an error so that we can catch it in our try catch block
        /*Adding 'new' */
    }

    return res.json();
};

export const toDateTime = (secs: number) => { // converting seconds to date time format
    var t = new Date('1970-01-01-01T00:30:00Z'); //Unix Epoch time
    t.setSeconds(secs); 
    return t;
};
