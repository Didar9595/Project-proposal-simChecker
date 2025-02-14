'use client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../auth/AuthContext'
import { Button, Table } from 'flowbite-react'

export default function DashProfile() {
  const { user, isSignedIn } = useUserContext()
  const [details, setDetails] = useState(null)
  const [show, setShow] = useState(false)
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

  const handleDelete = async() => {
    if(!user?.user?.isAdmin){
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
          dept:details.dept,
          name:details.uploadedBy,
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
