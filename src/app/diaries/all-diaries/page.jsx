'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './allDiaries.css'
import Image from 'next/image'
import { FaCrown, FaPencilAlt } from "react-icons/fa";
import logo from '../../../../public/logo.webp'
import crown from '../../../../public/crown.jpeg'
import Link from 'next/link'
import { Jodit } from 'jodit-react'
import Description from '@/components/Description'

const AllDiaries = () => {
  const session = useSession();
  const status = session.status
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [ind, setIndex] = useState()
  const [diaries, setDiaries] = useState([])
  // let arr = new Array(diaries.length).fill(false);
  let arr = new Array(diaries.length)
  let a = new Array(diaries.length)
  for (let i = 0; i < diaries.length; i++) {
    arr[i] = (diaries[i].favourite)
    a[i] = diaries[i].publicMode
  }
  const [fav, setFav] = useState(arr)
  const [pub, setPub] = useState(a)

  const getDiaries = async () => {
    try {
      const response = await axios.get('/api/all-diaries');
      let array = response.data?.diaries
      setDiaries(array.reverse())
      for (let i = 0; i < response.data?.diaries.length; i++) {
        arr[i] = response.data?.diaries[i].favourite
        a[i] = response.data?.diaries[i].publicMode
      }
      setFav(arr)
      setPub(a)
      // setContent(Jodit.modules.Helpers.stripTags(response.data?.diaries[i]))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/login')
    }
    else if (status === 'authenticated') {
      getDiaries()
    }
  }, [status, session])

  if (status === 'loading') {
    return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
  }

  const handleOpen = (index) => {
    setOpen(!open)
    setIndex(index)
    setTimeout(() => {
      router.push(`/diaries/edit-diary/${diaries.length - index - 1}`)
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
    <div className=''>
      <div className='bg-burlywood px-4 py-2 flex flex-col md:flex-row gap-5 justify-between items-center'>
        <div className='flex flex-col md:flex-row gap-5 justify-between items-center'>
          <Link href={'/diaries/all-diaries'}>
            <button className='bg-diary text-burlywood px-4 py-2 rounded-lg'>ALL</button>
          </Link>
          <Link href={'/diaries/all-diaries/favourite-diaries'}>
            <button className='bg-diary text-burlywood px-4 py-2 rounded-lg'>FAVOURITE</button>
          </Link>
          <Link href={'/diaries/all-diaries/my-public-diaries'}>
            <button className='bg-diary text-burlywood px-4 py-2 rounded-lg'>MY PUBLIC DIARIES</button>
          </Link>
        </div>
        <div>
          <Link href={'/new-diary'}>
            <button
              className='bg-diary text-burlywood px-4 py-2 rounded-lg flex gap-2 items-center'>
              <span> <FaPencilAlt className='text-md animate-pulse' />  </span>
              WRITE DIARY</button>
          </Link>
        </div>
      </div>
      <div>
        <Description />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 mx-auto'>
        {
          diaries.map((diary, index) => (
            <div key={index}>
              {
                (pub[index] === false) ? (
                  <div key={index} className={`diary1 w-[300px] h-[400px] rounded-xl overflow-hidden mx-auto ${open === true && index === ind ? 'animate-ping' : 'animate-none'}`}>
                    <div className='flex justify-end'>
                      <Image className="w-[175px] mx-auto mt-4 rounded-full" src={logo} alt="Memory" />
                      <div className='fav bg-white rounded-full cursor-pointer'>
                        {
                          (fav[index] === true) ? (
                            <div>
                              <FaCrown className=' text-amber-500 text-4xl m-2' />
                            </div>
                          ) : (
                            <FaCrown className=' text-black text-4xl m-2' />
                          )
                        }
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      <button onClick={() => handleOpen(index)} className='bg-diaryTag text-amber-300 px-4 py-2 rounded-tl-lg rounded-bl-lg animate-bounce'><span className=' animate-pulse'>Open
                      </span></button>
                    </div>
                    <div className="px-6 py-4 text-white">
                      <div className="font-bold text-2xl mb-2 underline">
                        {
                          diary.title.substring(0, 15) + "..."
                        }
                      </div>
                      <div className="text-base">
                        {
                          (Jodit.modules.Helpers.stripTags(diary.content)).substring(0, 25) + "..."
                        }
                      </div>
                    </div>
                    <div className="px-6 pb-2 pt-2 flex justify-start">
                      <div className=" bg-gray-200 rounded-md px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2 flex gap-5">
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
                ) : (
                  <div key={index} className={`diary2 w-[300px] h-[400px] rounded-xl overflow-hidden mx-auto shadow-2xl ${open === true && index === ind ? 'animate-ping' : 'animate-none'}`}>
                    <div className='flex justify-end'>
                      <Image className="w-[175px] mx-auto mt-4 rounded-full" src={logo} alt="Memory" />
                      <div className='fav rounded-full cursor-pointer'>
                        {
                          (fav[index] === true) ? (
                            <div>
                              <FaCrown className=' text-amber-500 text-4xl m-2' />
                            </div>
                          ) : (
                            <FaCrown className=' text-black text-4xl m-2' />
                          )
                        }
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      <button onClick={() => handleOpen(index)} className='bg-diaryTag shadow-lg text-amber-300 px-4 py-2 rounded-tl-lg rounded-bl-lg animate-bounce'><span className=' animate-pulse'>Open</span></button>
                    </div>
                    <div className="px-6 py-4 text-white">
                      <div className="font-bold text-2xl mb-2 underline text-diaryTag">
                        {
                          diary.title.substring(0, 15) + "..."
                        }
                      </div>
                      <div className="text-base text-diaryTag">
                        {
                          (Jodit.modules.Helpers.stripTags(diary.content)).substring(0, 25) + "..."
                        }
                      </div>
                    </div>
                    <div className="px-6 pb-2 pt-2 flex justify-start">
                      <div className=" bg-diaryTag rounded-md px-3 py-1 text-xl font-semibold text-white mr-2 mb-2 flex gap-5">
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
                )
              }

            </div>
          ))
        }
      </div >
    </div >
  )
}

export default AllDiaries