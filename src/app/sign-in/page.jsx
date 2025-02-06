'use client'
import { Button, ButtonGroup, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";

export default function page() {
    const [pass,setPass]=useState(true)
    return (
        <div className='p-14 flex items-center justify-center'>
            <div className='rounded-md py-8 px-3 bg-white shadow-md flex flex-col gap-5 items-center justify-center w-[40%]'>
                <img src="logo.png" alt="logo Image" width={150} className='rounded-md' />
                <TextInput type='text' placeholder='Enter your College Email ID...' className='w-[80%]' required/>
                <div className='w-[100%] flex flex-row justify-center items-center' >
                <TextInput type={pass?'password':'text'} placeholder='Enter your Password...' className='w-[72%]' required/>
                <div className='bg-slate-200 p-3 hover:cursor-pointer rounded-md'  onClick={()=>setPass(!pass)}>{pass?<VscEyeClosed/>:<RxEyeOpen/>}</div>
                </div>
                <Button gradientDuoTone='tealToLime' outline className='w-[30%] text-xl font-bold'>Login</Button>
                <div>&copy; 2025 Project Proposal Checker</div>
            </div>
        </div>
    )
}
