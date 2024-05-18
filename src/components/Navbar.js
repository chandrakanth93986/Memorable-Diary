'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const path = usePathname();

    return (
        <div>
            <nav className='b bg-diary p-5 text-white flex justify-between items-center'>
                <div>
                    <p>Logo</p>
                </div>
                <div>
                    <ul className='flex items-center gap-14'>
                        <li>
                            <Link href={'/'} className={`${path === '/' ? 'rounded-lg bg-white text-diary border px-4 py-2' : 'text-white'}`}>Home</Link>
                        </li>
                        <li>
                            <Link href={'/register'} className={`${path === '/register' ? 'rounded-lg bg-white text-diary border px-4 py-2' : 'text-white'}`}>Register</Link>
                        </li>
                        <li>
                            <Link href={'/login'} className={`${path === '/login' ? 'rounded-lg bg-white text-diary border px-4 py-2' : 'text-white'}`}>Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar