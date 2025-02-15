'use client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../auth/AuthContext'
import { Button, Table, Modal, TextInput, Label } from 'flowbite-react'
import { useRouter } from 'next/navigation'

export default function DashProfile() {
  const { user, isSignedIn } = useUserContext()
  const [details, setDetails] = useState(null)
  const [show, setShow] = useState(false)
  const [showModalOne, setShowModalOne] = useState(false)
  const [showModalTwo, setShowModalTwo] = useState(false)
  const [groupData,setGroupData]=useState({
    groupName:'',
    groupPass:undefined,
    members:[
      {
        username: user?.user?.username, 
        email: user?.user?.email,       
        id: user?.user?._id,             
        UIN: user?.user?.UIN,           
      },
    ],
    dept:user?.user?.dept
  });
  const [error,setError]=useState('')
  const [success,setSuccess]=useState("")
  const router=useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dept: user?.user?.dept,
            name: user?.user?.username
          }),
        })
        const data = await res.json()
        if (res.ok && data.project) {
          setDetails(data.project)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProjects();
  }, [user])

  const handleDelete = async () => {
    if (!user?.user?.isAdmin) {
      console.log("You are not authorized")
      return;
    }
    try {
      const res = await fetch('/api/projects/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: details._id,
          dept: details.dept,
          name: details.uploadedBy,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Successfully deleted")
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate=()=>{
    if(user?.user?.grpId!==""){
      setShowModalTwo(true);
    }
    else{
      setShowModalOne(true);
    }
  }


  const handleClick=async()=>{
    setSuccess('')
    setError('')
    try {
      const res=await fetch('/api/group/post',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(groupData)
      });
      const data = await res.json();
      if(res.ok){
        setError('')
        setSuccess("Successfully created a group")
        console.log(data)
        setTimeout(() => {
          setShowModalOne(false)
          location.reload()
        }, 3000);
      }
      else{
        setError(data.message)
        setSuccess('')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='border-dashed border-2 border-lime-500 flex flex-col gap-5 items-center  w-[100%] min-h-screen'>

      <div className='mt-10 shadow-md h-[fit-content] w-[92%] md:w-[60%] p-8 rounded-md flex flex-col gap-3'>
        <h1 className='text-xl font-bold '>User Profile:</h1>
        <div className='flex flex-row gap-5 items-center justify-center'>
          <img src="./profile.jpg" alt="profile picture" width={80} className="rounded-full" />
          <p className='font-medium text-normal'>Username: <span className='capitalize text-md font-light'>{user?.user?.username}</span></p>
        </div>
        <div className='flex flex-col gap-3 justify-center'>
          <p className='font-medium text-normal'>Email ID: <span className='text-md font-light italic underline'>{user?.user?.email}</span></p>
          <p className='font-medium text-normal'>UIN: <span className='text-md font-light'>{user?.user?.isAdmin ? user?.user?.UID : user?.user?.UIN}</span></p>
          <p className='font-medium text-normal'>Department: <span className='text-md font-light capitalize'>{user?.user?.dept}</span></p>
          <p className='font-medium text-normal'>Role: <span className='text-md font-light'>{user?.user?.isAdmin ? 'Head of the Department' : 'Student'}</span></p>
        </div>
        {
          !user?.user?.isAdmin && (
            <div className='w-[100%] flex flex-row gap-3 justify-end items-center'>
              <Button gradientDuoTone='tealToLime' outline className='text-[1rem]' onClick={handleCreate}>Create a Group</Button>
              <Modal show={showModalOne} size="md" onClose={()=>setShowModalOne(false)} popup>
                <Modal.Header />
                <Modal.Body>
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create a Group</h2>
                    <div className='flex flex-col gap-3 '>
                      <div className='flex flex-col gap-1'>
                        <Label>Group Name:</Label>
                        <TextInput type='text' value={groupData.groupName} onChange={e=>setGroupData({...groupData,groupName:e.target.value})} required/>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <Label>Group Code:</Label>
                        <TextInput type='number' onChange={e=>setGroupData({...groupData,groupPass:e.target.value})} required/>
                      </div>
                      <Button gradientDuoTone='tealToLime' outline className='w-[100%] lg:w-[30%] font-semibold' onClick={handleClick}>Create</Button>
                    </div>
                    {error && <p className='text-red-600 p-2 bg-slate-400'>{error}</p>}
                    {success && <p className='font-bold text-lime-600'>{success}</p>}
                  </div>
                </Modal.Body>
              </Modal>


              <Modal show={showModalTwo} size="md" onClose={()=>setShowModalTwo(false)} popup>
                <Modal.Header />
                <Modal.Body>
                  <div className="space-y-6">
                    <div className='text-bold'>You cannot create another group. Because you are a pert of a group already</div>
                  </div>
                </Modal.Body>
              </Modal>
              <Button gradientDuoTone='tealToLime' className='text-[1rem]' onClick={()=>router.push('/dashboard?tab=groups')}>View and Join Groups</Button>
            </div>
          )
        }
      </div>



      {
        user?.user?.isAdmin && details && (
          <div className='shadow-sm p-1 lg:p-5 flex flex-col gap-5 w-[92%] '>
            <div className='flex flex-row justify-between items-center '>
              <p>Project Data is present</p>
              <Button className='w-[25%]' gradientDuoTone='tealToLime' outline onClick={() => setShow(!show)}>{show ? 'Wrap' : 'Show'}</Button>

            </div>
            {
              show && (
                <div className='flex flex-col gap-5'>
                  <Table hoverable>
                    <Table.Head>
                      <Table.HeadCell>Project Title</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Abstract</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {
                        details.projects.map(project => (
                          <Table.Row key={project.projectTitle} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{project.projectTitle}</Table.Cell>
                            <Table.Cell>{project.category}</Table.Cell>
                            <Table.Cell>{project.abstract}</Table.Cell>
                          </Table.Row>
                        ))
                      }
                    </Table.Body>
                  </Table>
                  <div className='flex flex-row justify-between items-center '>
                    <div className='flex flex-col gap-2'>
                      <div className='italic font-bold'>Uploaded By: {details.uploadedBy}</div>
                      <div className='italic font-bold'>Threshold: {details.threshold}%</div>
                    </div>
                    <Button className='w-[30%]' gradientDuoTone='pinkToOrange' outline onClick={handleDelete}>Remove Data</Button>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      {
        user?.user?.isAdmin && !details && (
          <div>No Project Present pls upload data.</div>
        )
      }



    </div>
  )
}
