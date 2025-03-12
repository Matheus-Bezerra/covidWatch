import { ModeToggle } from '../ModeToggle'
import { NavLinks } from './NavLinks'
import Link from 'next/link'

export const Header = () => {
    return (
        <header className='border-b w-full'>
            <div className="flex justify-between h-16 items-center gap-6 px-6 max-w-[1600px] mx-auto">
                <div>
                    <Link href="/">
                        <p className='text-3xl font-bold cursor-pointer'>CovidWatch</p>
                    </Link>
                </div>

                <NavLinks />

                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
