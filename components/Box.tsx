import { twMerge } from "tailwind-merge"

interface BoxProps{
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children, className
}) => {
    return (
        <div className={twMerge (
            `
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
            `, //this is will enable us to reuse the box component and also pass in some addtional classnames
            className
            )}>
            {children}
        </div>
    )
}

export default Box;