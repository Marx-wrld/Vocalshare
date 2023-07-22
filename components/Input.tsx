import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ //forwardRef is a react hook that allows us to pass a ref to a child component
    className,
    type,
    disabled,
    ...props

}, ref) => { //ref is the reference to the input element

    return (
        <input 
            type={type}
            className={twMerge 
                ( //Using backticks so that I can collapse this into multiple classes/lines
                //file will be a special styling if we assign the type of the input to be file
                    `
                        flex
                        w-full
                        rounded-md
                        bg-neutral-700
                        border
                        border-transparent
                        px-3
                        py-3
                        text-sm
                        file:border-0 
                        file:bg-transparent
                        file:text-sm
                        file:font-medium
                        placeholder:text-neutral-400
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        focus:outline-none
                    `,
                    className //helps so that I can always modify my input if I want
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input;