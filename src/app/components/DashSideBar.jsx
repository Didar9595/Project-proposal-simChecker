'use client'
import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation"
import Link from "next/link"
import { ImProfile } from "react-icons/im";
import { PiSignOutBold } from "react-icons/pi";
import { useUserContext } from "../auth/AuthContext"


function SearchParamsHandler({ setTab }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const tabFromUrl = searchParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [searchParams]);

    return null;
}


export default function DashSideBar() {
    const [tab, setTab] = useState('')
    const searchParams = useSearchParams()
    const {user,isSignedIn}=useUserContext()
    const router=useRouter()
    
    const handleLogout=async()=>{
        try {
            const res = await fetch('/api/user/logout', {
              method: "GET",
            });
            if (res.ok) {
              localStorage.removeItem('token');
              console.log("Successfully Logout")
              router.push('/sign-in')
            }
            else {
              console.log("Difficulty in Logout")
            }
          } catch (error) {
            console.log(error)
          }
    }

    if (!isSignedIn) {
        return null;
    }
    
    return (
        <Sidebar className="w-full">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-3">
                    <Link href='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile' || !tab} icon={ImProfile} as='div' label={user?.user?.isAdmin?'Admin':'User'} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item className='cursor-pointer'  icon={PiSignOutBold} onClick={handleLogout}>
                            Logout
                        </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
