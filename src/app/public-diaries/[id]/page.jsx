'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useMemo } from 'react'
import { Jodit } from 'jodit-react'
import bg1 from '../../../../public/bg1.jpeg'
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});
import '../../new-diary/newDiary.css'

const p = () => {
    const session = useSession()
    const status = session.status
    const router = useRouter()
    const path = usePathname()
    const [pubDiary, setPubDiary] = useState({})
    let editor = useRef(null)
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = new Date().getDay();


    const getDiary = async () => {
        try {
            console.log(path.split('/')[2])
            const _id = path.split('/')[2];
            const response = await axios.post('/api/public-diary', { _id });
            setPubDiary(response.data?.publicDiary)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDiary()
    }, [])

    if (status === 'loading') {
        return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
    }

    const config = {
        readonly: true, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: '',
        height: 600,
        enter: 'br',
    }

    const ISOtoUTC = (iso) => {
        let date = new Date(iso).getUTCDate();
        let month = new Date(iso).getUTCMonth() + 1;
        let year = new Date(iso).getUTCFullYear()
        return `${date}/${month}/${year}`
    }

    return (
        <div style={{backgroundImage: {bg1}}}>
            <div>
                <div className='body-personal flex justify-center p-8' style={{ minHeight: '100vh' }}>
                    <form className='diary-form p-3 bg-white text-gray-900 rounded-2xl block mx-auto w-[100vw] md:w-[70vw]'>
                        <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
                            <div className='flex items-center my-2 md:my-0'>
                                <h1>{ISOtoUTC(pubDiary.createdAt)}</h1>
                            </div>

                            <label className="flex items-center cursor-pointer justify-end my-2 md:my-0" >
                                <input
                                    type="checkbox"
                                    value={pubDiary.publicMode}
                                    className="sr-only peer"
                                    checked={pubDiary.publicMode}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                <span className="ms-3 text-2xl font-medium text-gray-700 animate-pulse">
                                    Public mode
                                </span>
                            </label>
                        </div>
                        <div className='mx-4 bg-gray-300 h-0.5'></div>
                        <div>
                            <input
                                type="text"
                                disabled
                                defaultValue={pubDiary.title}
                                className="p placeholder:flex placeholder:items-center w-full p-4 focus:outline-none placeholder:text-5xl placeholder:text-center text-center bg-white text-5xl"
                                placeholder='TITLE' />
                        </div>
                        <div className='mx-4 bg-gray-300 h-0.5'></div>

                        <div>
                            <div className=''>
                                <JoditEditor
                                    innerRef={editor}
                                    value={pubDiary.content || ''}
                                    config={config}
                                    // onBlur={newContent => setDesc(newContent)}
                                    // onChange={newContent => { }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default p