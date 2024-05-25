'use client'

import React, { useEffect, useState } from 'react'
import './personal-space.css'
import Image from 'next/image'
import diary from '../../../public/diary.png'
import openingDiary from '../../../public/openingDiary.gif'
import { FaPencilAlt } from "react-icons/fa";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const PersonalSpace = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const session = useSession()
    const status = session.status

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session, status])

    if (status === 'loading') {
        return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
    }

    const handleDiary = async () => {
        setOpen(true)
        setTimeout(() => {
            router.push('/new-diary')
        }, 9000);
        setTimeout(() => {
            setOpen(false)
        }, 11000);
    }

    return (
        <div>
            {
                open === true ? (
                    <Image src={openingDiary} className='w-full h-full md:h-screen text-center' alt='Image' />
                ) : (
                    <div className='md:flex justify-center items-end w-full text-center'>
                        <Image src={diary} className='w-full h-full md:h-screen' alt='Image' />
                        <button onClick={handleDiary} className='md:absolute bg-diary text-white md:bg-white md:text-diary px-4 py-2 rounded-lg z-10 my-10 underline flex items-center mx-auto gap-3 animate-bounce'>
                            <span>
                                <FaPencilAlt className='text-xl animate-pulse' />
                            </span>
                            Open Today's Diary
                        </button>
                    </div>
                )
            }

            {/* <div className='ps w-full h-[750px]'>
                <div className='z-10 text-white font-bold text-2xl md:text-4xl lg:text-6xl text-center'>
                    <p className=''>
                        "Today's JOURNEY -
                        <br />
                        may be the best MEMORY!"
                    </p>
                </div>
            </div> */}

        </div>
    )
}

export default PersonalSpace