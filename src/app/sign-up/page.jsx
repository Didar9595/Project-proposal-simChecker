'use client'
import { Button, ButtonGroup, TextInput,Toast } from 'flowbite-react'
import { useState } from 'react'
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import {HiCheck} from "react-icons/hi"
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function page() {
    const [pass,setPass]=useState(true)
    const [form,setForm]=useState({username:'',email:'',password:''})
    const [error,setError]=useState('')
    const [success, setSuccess] = useState('');
    const router=useRouter()


  const validateEmail = (email) => {
      return email.endsWith("@eng.rizvi.edu.in");
  };

  const validatePassword = (password) => {
      return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

    const handleClick=async()=>{
      setError('')
      if (!validateEmail(form.email)) {
        setError("Email must end with @eng.rizvi.edu.in");
        return;
    }
    
    if (!validatePassword(form.password)) {
        setError("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
        return;
    }
    try {
          const res= await fetch('/api/user/post',{
              method:"POST",
              headers:{
                  'Content-Type':'application/json',
              },
              body:JSON.stringify(form),
          });
      const data=await res.json();
      if(!res.ok){
          console.log(data.message)
          return
      }
      if(res.ok){
        setSuccess("User registered successfully!");
        setTimeout(() => {
            router.push('/sign-in');
        }, 3000);
      }
      } catch (error) {
          setError("Username or Email already exists")
      }
    }

  return (
    <div className='py-14 flex items-center justify-center flex-col gap-5'>
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
            <div className='rounded-md py-8 px-3 bg-white shadow-md flex flex-col gap-5 items-center justify-center w-[95%] md:w-[40%]'>
                <img src="logo.png" alt="logo Image" width={150} className='rounded-md' />
                {error && <div className='text-red-700 p-2 rounded-sm italic font-bold bg-red-200'>{error}</div>}
                <form action={handleClick}  className='flex flex-col gap-5 w-[100%] items-center justify-center'>
                <TextInput type='text' placeholder='Enter your Username...' className='w-[80%]' required value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>
                <TextInput type='email' placeholder='Enter your College Email ID...' className='w-[80%]' required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <div className='w-[100%] flex flex-row justify-center items-center' >
                <TextInput type={pass?'password':'text'} placeholder='Enter your Password...' className='w-[72%]' value={form.password} required onChange={e=>setForm({...form,password:e.target.value})}/>
                <div className='bg-slate-200 p-3 hover:cursor-pointer rounded-md'  onClick={()=>setPass(!pass)}>{pass?<VscEyeClosed/>:<RxEyeOpen/>}</div>
                </div>
                <Button type='submit' gradientDuoTone='tealToLime' outline className='w-[30%] text-xl font-bold'>Register</Button>
                </form>
                <div>&copy; 2025 Project Proposal Checker</div>
            </div>
            
        </div>
  )
}
