"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {

    const router = useRouter();

    const onClick = () => {
        // Add auth before push - users to be able to login only if authenticated
        router.push(href);
    }

    return ( 
        <button className="
                relative
                group
                flex
                items-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-100/10
                hover:bg-neutral-100/10
                transition
                pr-4
        ">
            <div className="
                 relative
                 min-h-[64px]
                 min-w-[64px]
            ">
                <Image src={""} alt={""} />
            </div>
        </button>
     );
}
 
export default ListItem;