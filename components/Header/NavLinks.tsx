"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center space-x-5 lg:space-x-8">
            <Link href="/" className={`flex items-center gap-1 ${pathname === '/' ? 'font-bold' : ''}`}>
                Início
            </Link>

            <Link href="/relatar" className={`flex items-center gap-1 ${pathname === '/relatar' ? 'font-bold' : ''}`}>
                Relatar
            </Link>
        </nav>
    );
};
