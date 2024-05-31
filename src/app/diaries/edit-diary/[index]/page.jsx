'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import '../../../new-diary/newDiary.css'
import { Jodit } from 'jodit-react'
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { FaCrown } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import axios from 'axios'

const EditDiary = () => {
  const router = useRouter()
  const session = useSession()
  const status = session.status
  const [diaries, setDiaries] = useState([])
  const [diary, setDiary] = useState({})
  const params = usePathname()
  const [ind, setInd] = useState(params[params.length - 1])

  let editor = useRef(null)
  const [desc, setDesc] = useState(diary.content || '')
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = new Date().getDay();
  const [pub, setPub] = useState(diary.publicMode || false)
  const [favourite, setFavourite] = useState(diary.favourite || false)
  let { register, handleSubmit, formState: { errors } } = useForm()
  const [title, setTitle] = useState(diary.title || '')
  const [id, setId] = useState()

  const getDiaries = async () => {
    try {
      const response = await axios.get('/api/all-diaries');
      let array = response.data?.diaries
      setDiaries(array)
      setInd(params[params.length - 1])
      setDiary(array[ind]);
      setPub(array[ind].publicMode)
      console.log(array[ind]);
      setFavourite(array[ind].favourite)
      setTitle(array[ind].title)
      setId(array[ind]._id)
      setDesc(array[ind].content)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDiaries()
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/login')
    }
  }, [session, status])


  const handleFormSubmit = async (formObj) => {
    const contentText = desc;
    formObj.favourite = favourite
    formObj.content = contentText
    formObj.publicMode = pub
    formObj.email = session.data?.user?.email
    formObj.title = title
    formObj._id = id
    try {
      const response = await axios.put('/api/edit-diary', formObj);
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
    enter: 'br',
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
      <div>
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
                <input
                  type="text"
                  defaultValue={title}
                  onChange={e => setTitle(e.target.value)}
                  className="p placeholder:flex placeholder:items-center w-full p-4 focus:outline-none placeholder:text-5xl placeholder:text-center text-center bg-white text-5xl" {...register('title')}
                  placeholder='TITLE' />
            </div>
            <div className='mx-4 bg-gray-300 h-0.5'></div>

            <div>
              <div className=''>
                <JoditEditor
                  innerRef={editor}
                  value={diary.content || ''}
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
                  favourite === true ? (
                    <FaCrown
                      className='text-5xl cursor-pointer text-violet-600'
                      onClick={handleCrown}
                    />
                  ) : (
                    <FaCrown
                      className='text-5xl cursor-pointer animate-bounce'
                      onClick={handleCrown}
                    />
                  )
                }
                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center m-4">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditDiary