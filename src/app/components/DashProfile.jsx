'use client'
import React from 'react'
import { useUserContext } from '../auth/AuthContext'

export default function DashProfile() {
  const {user,isSignedIn}=useUserContext()
  return (
    <div className='border-dashed border-2 border-lime-500 p-10 w-[100%] h-[100%]'>
      <div className='m-10 shadow-md w-[fit-content] p-8 rounded-md flex flex-col gap-3'>
        <div className='flex flex-row gap-5 items-center justify-center'>
        <img src="./profile.jpg" alt="profile picture" width={80} className="rounded-full"/>
        <p className='font-medium text-xl'>Username: <span className='capitalize text-md font-light'>{user?.user?.username}</span></p>
        </div>
        <div className='flex flex-col gap-3 justify-center'>
          <p className='font-medium text-xl'>Email ID: <span className='text-md font-light italic underline'>{user?.user?.email}</span></p>
          <p className='font-medium text-xl'>UIN: <span className='text-md font-light'>{user?.user?.UIN}</span></p>
          <p className='font-medium text-xl'>Department: <span className='text-md font-light'>{user?.user?.dept}</span></p>
          <p className='font-medium text-xl'>Role: <span className='text-md font-light'>{user?.user?.isAdmin?'HoD':'Student'}</span></p>
        </div>
      </div>
    </div>
  )
}
