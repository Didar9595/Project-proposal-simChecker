'use client'
import { Button, Select, TextInput, Toast } from 'flowbite-react'
import { useState } from 'react'
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { HiCheck } from "react-icons/hi"
import { useRouter } from "next/navigation";

export default function page() {
  const [pass, setPass] = useState(true)
  const [form, setForm] = useState({ username: '', email: '', password: '',dept:'',UIN:'' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  const router = useRouter()


  const validateEmail = (email) => {
    return email.endsWith("@eng.rizvi.edu.in");
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  const validateUIN=(UIN)=>{
    return /^[0-9]{3}[A-Z]{1}[0-9]{3}$/.test(UIN)
  }

  const handleClick = async () => {
    setError('')
    if (!validateEmail(form.email)) {
      setError("Email must end with @eng.rizvi.edu.in");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
      return;
    }
    if(!validateUIN(form.UIN)){
      setError("UIN should be of form (111Y111).");
      return;
    }
    console.log(form)
    try {
      const res = await fetch('/api/user/post', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message)
        return
      }
      if (res.ok) {
        setSuccess("User registered successfully!");
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      <div className='rounded-md py-8 px-3 bg-white shadow-md flex flex-col gap-5 items-center justify-center w-[95%] md:w-[40%]'>
        <img src="logo.png" alt="logo Image" width={150} className='rounded-lg' />
        <h1 className='font-bold text-xl text-center border-b-2'>Student Registeration</h1>
        {error && <div className='text-red-500 p-2 rounded-md bg-slate-200'>{error}</div>}
        <form action={handleClick} className='flex flex-col gap-5 w-[100%] items-center justify-center'>
          <TextInput type='text' placeholder='Enter your Username...' className='w-[90%]' required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          <TextInput type='email' placeholder='Enter your College Email ID...' className='w-[90%]' required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <div className='w-[100%] flex flex-row justify-center items-center' >
            <TextInput type={pass ? 'password' : 'text'} placeholder='Enter your Password...' className='w-[82%]' value={form.password} required onChange={e => setForm({ ...form, password: e.target.value })} />
            <div className='bg-slate-200 p-3 hover:cursor-pointer rounded-md' onClick={() => setPass(!pass)}>{pass ? <VscEyeClosed /> : <RxEyeOpen />}</div>
          </div>
          <TextInput type='text' placeholder='Enter your UIN...' className='w-[90%]' required value={form.UIN} onChange={e => setForm({ ...form, UIN: e.target.value })} />
          <Select id="department" className='w-[90%]'  required value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})}>
            <option value="">Select Department</option>
            <option value="computer">Computer</option>
            <option value="AI&DS">AI&DS</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="ECS">ECS</option>
          </Select>
          <Button type='submit' gradientDuoTone='tealToLime' outline className='w-[30%] text-xl font-bold'>Register</Button>
        </form>
        <div>&copy; 2025 Project Proposal Checker</div>
      </div>

    </div>
  )
}
