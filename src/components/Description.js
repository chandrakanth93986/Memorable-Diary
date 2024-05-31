'use client'

import React from 'react'
import diary from '../../public/diary2.jpeg'
import pub from '../../public/public.png'
import Image from 'next/image'
import { FaCrown } from 'react-icons/fa'

const Description = () => {
    return (
        <div className='flex flex-col md:flex-row gap-5 justify-end p-4 items-center'>
            <div className='flex gap-2 items-center bg-black px-4 py-2 rounded-lg text-white'>
                <Image src={diary} alt='Personal diary' className='w-6' />
                Personal Diary
            </div>
            <div className='flex gap-2 items-center bg-black px-4 py-2 rounded-lg text-white'>
                <Image src={pub} alt='Public diary' className='w-6' />
                Public Diary
            </div>
            <div className='flex gap-2 items-center bg-black px-4 py-2 rounded-lg text-white'>
                <FaCrown className=' text-3xl text-amber-500' />
                Favourite Diary
            </div>
        </div>
    )
}

export default Description