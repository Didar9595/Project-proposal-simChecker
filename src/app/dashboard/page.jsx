'use client'
import {useState,useEffect,Suspense} from 'react'
import { useSearchParams } from 'next/navigation'
import DashProfile from '../components/DashProfile'
import { useRouter } from 'next/navigation'
import DashSideBar from '../components/DashSideBar'
import AddProjects from '../components/AddProjects'
import Groups from '../components/DashGroups'

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



export default function page() {

  const [tab,setTab]=useState('')
 const router=useRouter()

  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-1'>
      <div className='md:w-[20%]'>
        <DashSideBar/>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
                <SearchParamsHandler setTab={setTab} />
      </Suspense>
      <div className='w-[100%]'>
      {/* Tabs */}
      {tab==='profile' && <DashProfile/>}
      {tab==='groups' && <Groups/>}
      {tab=='addProjects' && <AddProjects/>}
      </div>
    </div>
  )
}