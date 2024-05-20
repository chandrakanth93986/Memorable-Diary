'use client';

import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import logo from '../../../../public/logo.webp'
import { useRouter } from 'next/navigation';
import './register.css'

const Register = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleFormSubmit = (e) => {
    console.log(e)
    router.push('/login')
  }

  return (
    <div className='flex items-center'>
      <div className='reg md:w-[75%] md:h-screen rounded-tr-full'>
      </div>
      <div className='h-screen flex items-center justify-center mx-auto md:mx-4'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='b min-w-96 min-h-[50%] bg-diary text-white p-8 rounded-xl'>
          <div className='text-center mb-5'>
            <Image src={logo} width={150} height={150} alt='Logo' className='r rounded-full block m-auto' />
            <h1 className='text-3xl text-yellow-300'>Register</h1>
          </div>
          <div>
          <div className='flex flex-col gap-1 mb-3'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className='rounded-md w-full p-2 text-black'
                placeholder='test@gmail.com'
                {...register('email', { required: true })} />
              {errors.email?.type === 'required' && (<p className='text-amber-200'>*Email is required!</p>)}
            </div>
            <div className='flex flex-col gap-1 mb-3'>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className='rounded-md w-full p-2 text-black'
                placeholder='John'
                {...register('username', { required: true, minLength: 3 })} />
              {errors.username?.type === 'required' && (<p className='text-amber-200'>*Username is required with atleast 3 characters!</p>)}
            </div>
            <div className='flex flex-col gap-1 mb-3'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className='rounded-md w-full p-2 text-black'
                placeholder='password'
                {...register('password', { required: true })} />
              {errors.password?.type === 'required' && (<p className='text-amber-200'>*Password is Required!</p>)}
            </div>
            <div className='text-center mt-8'>
              <button type="submit" className='px-4 py-2 bg-amber-300 text-diary rounded-md'>Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register