'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// import { Jodit } from 'jodit-react'
import logo from '../../../public/logo.webp'
import Image from 'next/image'
import '../diaries/all-diaries/allDiaries.css'
import { FaUserEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { AuroraBackground } from "../../components/ui/aurora-background";
import { motion } from 'framer-motion'

const Jodit = dynamic(() => import('jodit-react'), { ssr: false });

const PublicDiaries = () => {
    const session = useSession()
    const status = session.status
    const [pubDiaries, setPubDiaries] = useState([])
    const [open, setOpen] = useState(false)
    const [ind, setIndex] = useState()
    const router = useRouter()

    const stripTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const getDiaries = async () => {
        try {
            const response = await axios.get('/api/all-public-diaries');
            let array = response.data?.publicDiaries
            setPubDiaries(array.reverse())
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDiaries()
    }, [])

    if (status === 'loading') {
        return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
    }

    const handleOpen = (index, _id) => {
        setOpen(!open)
        setIndex(index)
        setTimeout(() => {
            router.push(`/public-diaries/${_id}`)
        }, 500);
    }


    const ISOtoUTC = (iso) => {
        let date = new Date(iso).getDate();
        let month = new Date(iso).getMonth() + 1;
        let year = new Date(iso).getFullYear()
        return `${date}/${month}/${year}`
    }

    const getTime = (iso) => {
        let hours = new Date(iso).getHours();
        let min = new Date(iso).getMinutes();
        return `${hours}:${min}`
    }

    return (
        <div>
            <AuroraBackground className="bg-diary text-white">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="font-extralight text-base md:text-5xl dark:text-neutral-200 py-2 font-serif text-white">
                        <i>Nothing is as fun as reading others thoughts!</i>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 mx-auto'>
                        {
                            pubDiaries.map((diary, index) => {
                                return (
                                    <div key={index}>
                                        <div key={index} className={`diary2 w-[300px] h-[400px] rounded-xl overflow-hidden mx-auto ${open === true && index === ind ? 'animate-ping' : 'animate-none'}`}>
                                            <div className='flex justify-end'>
                                                <Image className="w-[175px] mx-auto mt-4 rounded-full" src={logo} alt="Memory" />
                                                <div className='fav justify-centerrounded-full cursor-pointer text-diaryTag text-sm flex gap-1 items-center bg-white rounded-lg px-2 py-1'>
                                                    {
                                                        diary.email.substring(0, 13) + "..."
                                                    }
                                                    <FaUserEdit />
                                                </div>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button onClick={() => handleOpen(index, diary._id)} className='bg-diaryTag text-amber-300 px-4 py-2 rounded-tl-lg rounded-bl-lg animate-bounce'><span className=' animate-pulse'>Open
                                                </span></button>
                                            </div>
                                            <div className="px-6 py-4 text-diaryTag">
                                                <div className="font-bold text-2xl mb-2 underline">
                                                    {
                                                        diary.title.substring(0, 15) + "..."
                                                    }
                                                </div>
                                                <div className="text-base">
                                                    {
                                                        stripTags(diary.content).substring(0, 25) + "..."
                                                    }
                                                </div>
                                            </div>
                                            <div className="px-6 pb-2 pt-2 flex justify-start">
                                                <div className="bg-diaryTag text-white rounded-md px-3 py-1 text-xl font-semibold mr-2 mb-2 flex gap-5">
                                                    <div>
                                                        {
                                                            ISOtoUTC(diary.createdAt)
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            getTime(diary.createdAt)
                                                        }
                                                        (time)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </motion.div>
            </AuroraBackground>

        </div>
    )
}

export default PublicDiaries