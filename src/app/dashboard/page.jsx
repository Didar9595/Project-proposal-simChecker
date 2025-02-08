'use client'
import {useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import DashProfile from '../components/DashProfile'
import { useRouter } from 'next/navigation'
import DashSideBar from '../components/DashSideBar'

export default function page() {
  const searchParams=useSearchParams()
  const [tab,setTab]=useState('')
 const router=useRouter()

  useEffect(()=>{
    const urlParams=new URLSearchParams(searchParams);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[searchParams])
  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-1'>
      <div className='md:w-[25%]'>
        <DashSideBar/>
      </div>
      {/* Tabs */}
      {tab==='profile' && <DashProfile/>}
    </div>
  )
}