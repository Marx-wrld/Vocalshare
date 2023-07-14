import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> { //This is the type of the props that the button element accepts without having to declare them

}

const Button = forwardRef<HTMLButtonElement, ButtonProps> (({ //This is the type of the props that the Button component accepts without having to write them out
    className,
    children,
    disabled,
    type="button",
    ...props
}, ref) => {
    return (
        <button 
            type={type}
                className={twMerge (
                    `
                        w-full
                        rounded-full
                        bg-green-500
                        border-transparent
                        px-3
                        py-3
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        text-black
                        font-bold
                        hover:opacity-75
                        transition
                    `, 
                    className //Allows us to always modify our button if needed 
                )}
                disabled={disabled}
                ref={ref}
                {...props} //This allows us to pass any other props that we might need to the button element
                >
                {children} {/*This is the content of the button */}
        </button>
    )
})

Button.displayName = "Button"
 
export default Button;