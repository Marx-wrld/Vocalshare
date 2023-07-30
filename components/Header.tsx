"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
 
const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {

  const authModal = useAuthModal(); // this will help us trigger our modal, we don't want to keep it just open
  const router = useRouter();

  const supabaseClient = useSupabaseClient(); //we're getting the supabase client from the context
  const { user } = useUser(); //we're getting the user from the context


  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //reset any playing songs
    router.refresh();

    if (error) {
      //we can use the toaster here instead of console.log(error); to show the error or logout success message
      toast.error(error.message); 
    } else{
      toast.success("Logout successful");
    }
  }

  return (
    <div className={twMerge(
      `
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
      `,
       className
    )}
    >
      <div className="
          w-full
          mb-4
          flex
          items-center
          justify-between
        ">
          <div className="
              hidden
              md:flex
              gap-x-2
              items-center
            ">
              <button
                onClick={() => router.back()}
                className="
                   rounded-full
                   bg-black
                   flex
                   items-center
                   justify-center
                   hover:opacity-75
                   transition
                "
              >
                <RxCaretLeft className="text-white" size={35} />
              </button>

              <button
                onClick={() => router.forward()}
                 className="
                   rounded-full
                   bg-black
                   flex
                   items-center
                   justify-center
                   hover:opacity-75
                   transition
                "
              >
                <RxCaretRight className="text-white" size={35}/>
              </button>
          </div>
          <div className="flex md:hidden gap-x-2 items-center ">
            <button className="
                    rounded-lg
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    "
              >
              <HiHome className="text-black" size={20} />
            </button>

            <button className="
                    rounded-lg
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    ">
              <BiSearch className="text-black" size={20} />
            </button>
          </div>
          <div className="
                flex
                justify-between
                items-center
                gap-x-4
                "
            >
              {user ? (
                <div className="
                      flex
                      gap-x-4
                      items-center
                ">
                  <Button 
                    onClick={handleLogout}
                    className="
                      bg-white
                      px-6
                      py-2
                    "
                  >
                    Logout
                  </Button>
                  
                  <Button 
                        onClick={() => router.push('/account')}
                        className="bg-white"
                  >
                    <FaUserAlt />
                  </Button>
                  
                </div>
              ) : (

                  <>
                    <div>
                      <Button 
                        onClick={authModal.onOpen} 
                          className="
                              bg-transparent
                              text-neutral-300
                              font-medium
                      ">
                         Sign Up
                      </Button>
                    </div>

                    <div>
                      <Button
                        onClick={authModal.onOpen} 
                          className="
                              bg-white
                              px-6
                              py-2
                      ">
                         Log in
                      </Button>
                    </div>
                  </>
                  )}
          </div>
      </div>
      {children}
    </div>
  )
}

export default Header;
