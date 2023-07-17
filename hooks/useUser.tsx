import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { createContext, useState } from "react";
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

    const getUserDetails = () => supabase.from('users').select('*').single(); //we're getting the user details from the db 
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single(); //we're getting the subscription from the db and we're only getting the ones that are trialing or active
}