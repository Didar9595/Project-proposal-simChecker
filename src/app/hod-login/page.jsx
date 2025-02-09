'use client'
import { Button, Toast, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { HiCheck } from "react-icons/hi"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function page() {
    const [pass, setPass] = useState(true)
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const router = useRouter()
   


    return (
        <div className='px-2 md:px-8 py-14 flex items-center justify-center flex-col gap-5'>
            {
                success && (
                    <div>
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{success}</div>
                            <Toast.Toggle />
                        </Toast>
                    </div>
                )
            }
            <div className='rounded-md py-4 px-2 bg-white shadow-md flex flex-col gap-5 items-center justify-center w-[92%] md:w-[40%]'>
                <img src="logo.png" alt="logo Image" width={150} className='rounded-lg' />
                <h1 className='font-bold text-xl text-center border-b-2'>HoD Login</h1>
                {error && <div className='text-red-500 p-2 rounded-md bg-slate-200'>{error}</div>}

                <form action="" className='flex flex-col gap-5 w-[100%] items-center justify-center'>
                    <TextInput type='email' placeholder='Enter your College Email ID...' className='w-[90%]' required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <div className='w-[100%] flex flex-row justify-center items-center' >
                        <TextInput type={pass ? 'password' : 'text'} placeholder='Enter your Password...' className='w-[82%]' required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                        <div className='bg-slate-200 p-3 hover:cursor-pointer rounded-md' onClick={() => setPass(!pass)}>{pass ? <VscEyeClosed /> : <RxEyeOpen />}</div>
                    </div>
                    <Button type='submit' gradientDuoTone='tealToLime' outline className='w-[30%] text-xl font-bold'>Login </Button>
                </form>
                <div>
                    Student Login? <Link href='/sign-in' className='text-emerald-500 cursor-pointer'>Switch</Link>
                </div>
                <div>&copy; 2025 Project Proposal Checker</div>
            </div>
        </div>
    )
}
