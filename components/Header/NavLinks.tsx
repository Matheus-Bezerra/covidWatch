"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ClipboardListIcon } from "lucide-react";

export const NavLinks = () => {
    const pathname = usePathname();

    return (
        <nav className="flex flex-wrap gap-1 justify-center items-center space-x-5 lg:space-x-8">
            <Link href="/" className={`flex items-center gap-1 ${pathname === '/' ? 'font-bold' : 'font-light'}`}>
                <HomeIcon className={`block sm:hidden ${pathname === '/' ? 'text-accent' : 'text-primary'}`} />
                <span className="hidden sm:block">Início</span>
            </Link>

            <Link href="/registrar" className={`flex items-center gap-1 ${pathname === '/registrar' ? 'font-bold' : 'font-light'}`}>
                <ClipboardListIcon className={`block sm:hidden ${pathname === '/registrar' ? 'text-accent' : 'text-primary'}`} />
                <span className="hidden sm:block">Registrar Casos</span>
            </Link>
        </nav>
    );
};
