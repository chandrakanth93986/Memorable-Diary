'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '../../public/logo.webp'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()
    const path = usePathname();
    const session = useSession();
    const handleSignout = async() => {
        await signOut()
        router.push('/')
      }

    return (
        <div>
            <nav className='bg-diary p-5 text-white flex justify-between items-center'>
                <div className=''>
                    <Image src={logo} width={50} height={100} alt='Logo' className='r rounded-full block m-auto' />
                </div>
                {
                    session.status === 'authenticated' ? (
                        <div className='text-center'>
                            <button onClick={handleSignout} className='px-4 py-2 bg-white text-diary rounded-md'>Sign Out</button>
                        </div>
                    ) : (
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
                    )
                }

            </nav>
        </div>
    )
}

export default Navbar