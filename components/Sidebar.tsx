"use client"; //because our sidebar component is going to be dynamic

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";

interface SidebarProps {
    childen: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search', //active everytime the pathname is not search
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]); //adding pathname to the list of our dependency arrays

    return (
        <div className="flex h-full">
            <div className="hidden 
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]">
                <Box>
                    Sidebar Navigation
                </Box>
            </div>
        </div>
    );
}

export default Sidebar;