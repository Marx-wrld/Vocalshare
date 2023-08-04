import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

//context type
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null; 
 }

 //context
 export const UserContext = createContext<UserContextType | undefined>(undefined);

 //props interface (a general props)
export interface Props { 
    [propName: string]: any; 
}

//contextProvider
export const MyUserContextProvider = (props: Props) => {
    const { //items we're extracting from useSessionContext
        session, 
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();

    const user = useSupaUser(); //we're re-mapping this to supaUser because our useUser is going to be our custom hook
    const accessToken = session?.access_token ?? null; //if session is null, then access_token is null
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); //state for user details
    const [subscription, setSubscription] = useState<Subscription | null>(null); //state for subscription

    const getUserDetails = () => 
        supabase
            .from('users')
            .select('*')
            .single(); //we're getting the user details from the db 
    const getSubscription = () => 
        supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single(); //we're getting the subscription from the db and we're only getting the ones that are trialing or active

    //creating a useEffect to get the user details and subscription and set the states
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) { //if we have a user and we're not loading data and we don't have user details and we don't have a subscription then we're going to get the user details and subscription
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                //if the promise is fulfilled then we're going to set the user details and subscription to the data
                if (userDetailsPromise.status === 'fulfilled') {
                    setUserDetails(userDetailsPromise.value.data as UserDetails);
                }
                
                if (subscriptionPromise.status === 'fulfilled') {
                    setSubscription(subscriptionPromise.value.data as Subscription);
                }
                //we're done loading data

                setIsLoadingData(false);
            });
        } else if (!user && !isLoadingUser && !isLoadingData) { //if we don't have a user and we're not loading the user and we're not loading data then we're going to set the user details and subscription to null
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    //we're returning the user context provider and we're passing in the user context value

    const value = { //we're passing in the user context value
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />
    //we're spreading the props because we want to be able to pass in props to the user context provider

};

//exporting our useUser hook

export const useUser = () => {

    const context = useContext(UserContext); //we're getting the context

    if (context === undefined) { //if the context is undefined then we're going to throw an error
        throw new Error('useUser must be used within a MyUserContextProvider');
    }

    return context; //we're returning the context

}
