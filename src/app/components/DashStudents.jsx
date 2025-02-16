import React, { useEffect, useState } from 'react'
import { useUserContext } from '../auth/AuthContext'
import { Button,Table } from 'flowbite-react'

export default function DashStudents() {
    const { user, isSignedIn } = useUserContext()
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch('/api/user/fetch', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dept: user?.user?.dept
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    setStudents(data.students);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudents()
    }, [user])
    return (
        <div className='p-5'>
            {
                students.length > 0 ? (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Sr. No.</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>UIN</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y ">
                            {
                                students.map((student, index) => (
                                    <Table.Row key={student._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                                        <Table.Cell>{index + 1}.</Table.Cell>
                                        <Table.Cell>{student.username}</Table.Cell>
                                        <Table.Cell>{student.email}</Table.Cell>
                                        <Table.Cell>{student.UIN}</Table.Cell>
                                        <Button gradientDuoTone='pinkToOrange' outline>Remove</Button>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                ) : (
                    <div className='text-lg font-semibold text-red-600 text-center'>No Students in your department...</div>
                )
            }
        </div>
    )
}
