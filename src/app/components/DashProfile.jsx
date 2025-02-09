'use client'
import React from 'react'
import { useUserContext } from '../auth/AuthContext'

export default function DashProfile() {
  const {user,isSignedIn}=useUserContext()
  return (
    <div className='border-dashed border-2 border-lime-500 flex justify-center  w-[100%] min-h-screen'>
      
      <div className='mt-10 shadow-md h-[fit-content] w-[92%] md:w-[60%] p-8 rounded-md flex flex-col gap-3'>
      <h1 className='text-xl font-bold '>User Profile:</h1>
        <div className='flex flex-row gap-5 items-center justify-center'>
        <img src="./profile.jpg" alt="profile picture" width={80} className="rounded-full"/>
        <p className='font-medium text-normal'>Username: <span className='capitalize text-md font-light'>{user?.user?.username}</span></p>
        </div>
        <div className='flex flex-col gap-3 justify-center'>
          <p className='font-medium text-normal'>Email ID: <span className='text-md font-light italic underline'>{user?.user?.email}</span></p>
          <p className='font-medium text-normal'>UIN: <span className='text-md font-light'>{user?.user?.UIN}</span></p>
          <p className='font-medium text-normal'>Department: <span className='text-md font-light capitalize'>{user?.user?.dept}</span></p>
          <p className='font-medium text-normal'>Role: <span className='text-md font-light'>{user?.user?.isAdmin?'HoD':'Student'}</span></p>
        </div>
      </div>
    </div>
  )
}
