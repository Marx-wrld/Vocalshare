"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";

const AuthModal = () => { // we'll use this component to render the login and register forms

    const supabaseClient = useSupabaseClient(); //we're getting the supabase client from the context
    const router = useRouter(); //we're getting the router from nextjs
    const {session} = useSessionContext(); //

    return ( 
        <Modal  title="Welcome back"
                description="Sign in to your account to continue"
                isOpen
                onChange={() => {}}        
        >
           <Auth supabaseClient={supabaseClient} />        
        </Modal>
     );
}
 
export default AuthModal;