"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => { // we'll use this component to render the login and register forms

    const supabaseClient = useSupabaseClient(); //we're getting the supabase client from the context
    const router = useRouter(); //we're getting the router from nextjs
    const {session} = useSessionContext(); //we're getting the session from the context
    const { onClose, isOpen } = useAuthModal(); // this will help us trigger our modal, we don't want to keep it just open
    
    useEffect(() => {
      if (session) {
        router.refresh();//we're refreshing the page when the user logs in
        onClose(); //we're closing the modal when the user logs in
      }
    }, [session, router, onClose]) //we're adding the session, router and onClose to the dependencies array, so that we can redirect the user when he logs in
    
    const onChange = (open: boolean) => { //this will handle our close function
      if (!open) {
         onClose();
      }

    }

    return ( 
        <Modal  
               title="Welcome back"
               description="Sign in to your account to continue"
               isOpen={isOpen}
               onChange={onChange}        
        >
           <Auth 
               theme="dark"
               magicLink={true}
               providers={['google', 'github']} 
               supabaseClient={supabaseClient} 
               appearance={{
                  theme: ThemeSupa, 
                  variables: {
                     default: {
                        colors: {
                           brand: '#404040',
                           brandAccent: '#22c55e'
                        }
                     }
                  }
               }}
           />        
        </Modal>
     );
}
 
export default AuthModal;