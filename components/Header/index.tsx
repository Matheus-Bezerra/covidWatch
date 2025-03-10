import React from 'react'
import { ModeToggle } from '../ModeToggle'
import { NavLinks } from './NavLinks'

export const Header = () => {
    return (
        <header className="border-b">
            <div className="flex justify-between h-16 items-center gap-6 px-6">

                <div>
                    <p className='text-3xl font-bold'>CovidWatch</p>
                </div>

                <NavLinks />

                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
