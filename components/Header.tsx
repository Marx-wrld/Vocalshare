"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
 
const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const router = useRouter();

  const handleLogout = () => {
    //Handle logout function
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
                <RxCaretLeft className="text-white" size={35}/>
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
      </div>
    </div>
  )
}
export default Header;
