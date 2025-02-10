'use client'
import { Button, } from 'flowbite-react'
import React, { useState } from 'react'
import { useUserContext } from './auth/AuthContext'

export default function page() {
  const [data,setData]=useState('')
  const {user,isSignedIn}=useUserContext()

  const handleClick=()=>{
    setData(localStorage.getItem('token'))
  }
  return (
    <div className='h-[70vh]'>Home Page</div>
  )
}
