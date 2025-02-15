'use client'
import { Sidebar } from "flowbite-react"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ImProfile } from "react-icons/im";
import { PiSignOutBold } from "react-icons/pi";
import { useUserContext } from "../auth/AuthContext"
import { VscProject } from "react-icons/vsc";
import { FaPeopleGroup } from "react-icons/fa6";

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
    const { user, isSignedIn } = useUserContext()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: "GET",
            });
            if (res.ok) {
                localStorage.removeItem('token');
                console.log("Successfully Logout")
                location.reload()
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
            <Suspense fallback={<p>Loading...</p>}>
                <SearchParamsHandler setTab={setTab} />
            </Suspense>
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-3">
                    <Link href='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile' || !tab} icon={ImProfile} as='div' label={user?.user?.isAdmin ? 'HoD' : 'User'} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {user?.user?.isAdmin && (
                        <Link href='/dashboard?tab=addProjects'>
                            <Sidebar.Item
                                icon={VscProject}
                                active={tab==='addProjects' || !tab}
                                as='div'
                            >
                                Add Projects
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link href='/dashboard?tab=groups'>
                        <Sidebar.Item active={tab === 'groups' || !tab} icon={FaPeopleGroup} as='div'>
                            Groups
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item className='cursor-pointer' icon={PiSignOutBold} onClick={handleLogout}>
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
