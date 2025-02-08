'use client'
import { Button, Navbar, TextInput } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"
import { useUserContext } from "../auth/AuthContext";

const Header = () => {
  const router = useRouter()
  const path = usePathname();
  const {user,isSignedIn}=useUserContext()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: "GET",
      });
      if (res.ok) {
        localStorage.removeItem('token');
        console.log("Successfully Logout")
        router.push('/')
      }
      else {
        console.log("Difficulty in Logout")
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Navbar className="bg-emerald-100 h-[fit-content] ">
      <Link href='/' className="font-bold text-lg sm:text-xl dark:text-white w-[27%] sm:w-[20%] md:w-[8%]">
        <img src="./logo.png" alt="Logo Image" className="rounded-lg" />
      </Link>
      {
        isSignedIn && <img src="./profile.jpg" alt="" width={70} className="rounded-full"/>
      }
      <Navbar.Toggle className="bg-gray-100" />
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link active={path === '/'} as={'div'}>Home</Navbar.Link>
        </Link>
        <Link href='/dashboard'>
          <Navbar.Link active={path === '/dashboard'} as={'div'}>Dashboard</Navbar.Link>
        </Link>
      </Navbar.Collapse>
      {
        isSignedIn?(
          <Button gradientDuoTone="tealToLime" outline className="hidden md:block" onClick={handleLogout}>Logout</Button>
        ):(
        <Link href='/sign-in'>
          <Button gradientDuoTone="tealToLime" outline>Sign-In</Button>
        </Link>
        )
      }
     
    </Navbar>
  )
}

export default Header