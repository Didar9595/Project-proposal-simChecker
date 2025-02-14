'use client'
import { Button, Label, Table, TextInput, Select ,Toast} from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useUserContext } from '../auth/AuthContext';
import { useRouter } from 'next/navigation';
import { HiCheck } from "react-icons/hi"

export default function AddProjects() {
    const [projects, setProjects] = useState([]);
    const { user, isSignedIn } = useUserContext()
    const [data, setData] = useState({ projects: [], dept: '', threshold: 0 ,uploadedBy:''})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const router = useRouter()

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            const formattedProjects = parsedData.map((row) => ({
                projectTitle: row['Project Title'] || '',
                category: row['Category'] || '',
                abstract: row['Abstract'] || '',
            }));

            setProjects(formattedProjects);
            setData({ projects: formattedProjects,uploadedBy:user?.user?.username })
        };
        reader.readAsArrayBuffer(file);
    };



    const handleUpload = async() => {
        setError('')
        if (data.dept == user?.user?.dept) {
            try {
                const res = await fetch('/api/projects/post', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
                const payload = await res.json();
                if (!res.ok) {
                  setError(payload.message)
                  return
                }
                if (res.ok) {
                  setSuccess("Projects uploaded successfully!");
                  setTimeout(() => {
                    router.push('/dashboard?tab=profile');
                  }, 3000);
                }
              } catch (error) {
                console.log(error)
              }
        }
        else {
            setError("Wrong Department")
            return
        }
    }

    return (
        <div className="p-6 flex flex-col gap-5">
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
                  {error && <div className='text-red-500 p-2 rounded-md bg-slate-200'>{error}</div>}
            <TextInput type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className="border p-2" />
            <div className="mt-4">
                {projects.length > 0 && (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Project Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Abstract</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                projects.map(project => (
                                    <Table.Row key={project.projectTitle} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{project.projectTitle}</Table.Cell>
                                        <Table.Cell>{project.category}</Table.Cell>
                                        <Table.Cell>{project.abstract}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                )}
            </div>
            <Select id="department" className='w-[100%] lg:w-[30%]' required value={data.dept} onChange={e => setData({ ...data, dept: e.target.value })}>
                <option value="">Select Department</option>
                <option value="computer">Computer</option>
                <option value="AI&DS">AI&DS</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="ECS">ECS</option>
            </Select>
            <div>
                <Label>Threshold</Label>
                <TextInput type='number' className='w-[100%] lg:w-[30%]' onChange={e => setData({ ...data, threshold: e.target.value })} />
            </div>
            <Button gradientDuoTone='tealToLime' outline className='w-[20%]' onClick={handleUpload}>Upload</Button>
        </div>
    );
}
