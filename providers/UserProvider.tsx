"use client"; 
//this is a hook a client can use to access our db

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps { //props interface (a general props)
    children: React.ReactNode; 
};

const UserProvider: React.FC<UserProviderProps> = ({ //we're creating a user provider
    children
}) => {
    return (
        <MyUserContextProvider> {/*we're wrapping our entire app inside user provider*/}
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider; 