'use client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../auth/AuthContext'
import { Button, Table,Modal,Label,TextInput } from 'flowbite-react'

export default function DashGroups() {
  const { user, isSignedIn } = useUserContext()
  const [groups, setGroups] = useState([])
  const [grpId, setGrpId] = useState('')
  const [grpPass,setGrpPass]=useState(undefined)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/group/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dept: user?.user?.dept
          })
        });
        const data = await res.json()
        console.log(data)
        if (res.ok) {
          setGroups(data.groups)
        }
        else {
          console.log("Error getting the groups")
        }
        console.log(groups)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGroups();
  }, [user])

  const handleJoin = (groupId) => {
    setGrpId(groupId)
    setShowModal(true)
  }

  const handleJoinFinal=async()=>{
    try {
      const res=await fetch('/api/group/join',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userId:user?.user?._id,
          name:user?.user?.username,
          email:user?.user?.email,
          UIN:user?.user?.UIN,
          grpid:grpId,
          pass:grpPass,
        })
      });

      const data=await res.json()
      if(res.ok){
        setShowModal(false)
        location.reload()
      }
      else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-5'>
      <h2 className='font-bold text-lg capitalize'>{user?.user?.dept} Department Groups</h2>
      {groups.length != 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Sr. No.</Table.HeadCell>
            <Table.HeadCell>Group Name</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Abstract</Table.HeadCell>
            <Table.HeadCell>Members</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              groups.map((group, index) => (
                <Table.Row key={group._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}.</Table.Cell>
                  <Table.Cell>{group.grp_name}</Table.Cell>
                  <Table.Cell>{group.title}</Table.Cell>
                  <Table.Cell>{group.abstract}</Table.Cell>
                  <Table.Cell className=''>
                    <div className='flex flex-col gap-1'>
                    {
                      group.members.map((member, idx) => (
                        <div key={idx}>
                          {idx+1}.{idx == 0 ? `${member.username} (Group Leader)` : `${member.username}`}
                        </div>
                      ))
                    }
                    </div>
                  </Table.Cell>
                  <Button gradientDuoTone='tealToLime' outline onClick={() => handleJoin(group._id)} disabled={user?.user?.grpId?true:false}>Join</Button>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      ) : (
        <div className='text-center w-[100%] text-red-600 font-semibold text-lg mt-5'>No Groups Present in your Department...</div>
      )}


      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Join a Group</h2>
            <div className='flex flex-col gap-3 '>
              <div className='flex flex-col gap-1'>
                <Label>Enter Group Code:</Label>
                <TextInput type='number' onChange={e=>setGrpPass(e.target.value)} required />
              </div>
              <Button gradientDuoTone='tealToLime' outline className='w-[100%] lg:w-[30%] font-semibold' onClick={handleJoinFinal}>Join</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
