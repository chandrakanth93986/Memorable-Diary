'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import './newDiary.css'
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { FaCrown } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import axios from 'axios'
import Link from 'next/link'

const NewDiary = () => {
    const editor = useRef(null)
    const [desc, setDesc] = useState('')
    const session = useSession();
    const status = session.status;
    const router = useRouter();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = new Date().getDay();
    const [pub, setPub] = useState(false)
    const [favourite, setFavourite] = useState(false)
    // const [text, setText] = useState('');
    let { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        console.log(session)
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session, status])

    const handleFormSubmit = async (formObj) => {
        // formObj.preventDefault();
        if (desc === '') {
            return toast.error('Please Make Your Diary!')
        }
        // const contentText = Jodit.modules.Helpers.stripTags(desc);
        const contentText = desc
        formObj.favourite = favourite
        formObj.content = contentText
        formObj.publicMode = pub
        formObj.email = session.data?.user?.email
        console.log(formObj)
        try {
            const response = await axios.post('/api/new-diary', formObj);
            if (response.data.success === true || response.status < 300) {
                toast.success(response.data.message)
                router.push('/diaries/all-diaries')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const handleCrown = () => {
        setFavourite(!favourite)
    }

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: '',
        height: 600,
        enter: 'br'
    }), [])

    const toggleVisibility = () => {
        setPub(!pub)
    }

    const ISOtoUTC = (iso) => {
        let date = new Date(iso).getUTCDate();
        let month = new Date(iso).getUTCMonth() + 1;
        let year = new Date(iso).getUTCFullYear()
        return `${date}/${month}/${year}`
    }

    if (status === 'loading') {
        return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
    }

    return (
        <div>
            <div className='bg-burlywood px-4 py-2 flex flex-col md:flex-row gap-5 justify-center items-center'>
                <Link href={'/diaries/all-diaries'}>
                    <button className='bg-diary text-white px-4 py-2 rounded-lg'>ALL</button>
                </Link>
                <Link href={'/diaries/all-diaries/favourite-diaries'}>
                    <button className='bg-diary text-white px-4 py-2 rounded-lg'>FAVOURITE</button>
                </Link>
                <Link href={'/diaries/all-diaries/my-public-diaries'}>
                    <button className='bg-diary text-white px-4 py-2 rounded-lg'>MY PUBLIC DIARIES</button>
                </Link>
            </div>
            <div className='body-personal flex justify-center p-8' style={{ minHeight: '100vh' }}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className='diary-form p-3 bg-white text-gray-900 rounded-2xl block mx-auto w-[100vw] md:w-[70vw]'>
                    <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
                        <div className='flex items-center my-2 md:my-0'>
                            {/* <SlCalender className='text-2xl' /> */}
                            <h1 className='mx-2'>{days[day]} <span>,</span></h1>
                            <h1>{ISOtoUTC(Date())}</h1>
                        </div>

                        <label className="flex items-center cursor-pointer justify-end my-2 md:my-0" >
                            <input
                                type="checkbox"
                                value={pub}
                                className="sr-only peer"
                                checked={pub}
                                onChange={toggleVisibility}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                            <span className="ms-3 text-2xl font-medium text-gray-700 animate-pulse">
                                Public mode
                            </span>
                        </label>
                    </div>
                    <div className='mx-4 bg-gray-300 h-0.5'></div>
                    <div>
                        <input type="text" id="large-input" className="p placeholder:flex placeholder:items-center w-full p-4 focus:outline-none placeholder:text-5xl placeholder:text-center text-center text-5xl" {...register('title')} placeholder='TITLE' />
                    </div>
                    <div className='mx-4 bg-gray-300 h-0.5'></div>

                    <div>
                        <div className=''>
                            <JoditEditor
                                innerRef={editor}
                                value={desc || ''}
                                config={config}
                                onBlur={newContent => setDesc(newContent)}
                                onChange={newContent => { }}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='mx-4 flex gap-2 items-center text-xl'>
                            <p>Make Favourite</p>
                            <FaHandPointRight className='text-3xl animate-pulse' />
                        </div>
                        <div className='flex gap-2 items-center '>
                            {
                                favourite === false ? (
                                    <FaCrown
                                        className='text-5xl cursor-pointer animate-bounce'
                                        onClick={handleCrown}
                                    />
                                ) : (
                                    <FaCrown
                                        onClick={handleCrown}
                                        className='text-5xl cursor-pointer text-violet-600'
                                    />
                                )
                            }
                            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center m-4">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewDiary