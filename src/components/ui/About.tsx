// import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table"

type Person = {
    id: number
    name: string
    description: string
    isCompleted: boolean
    images: { imageName: string }[]
}

function About() {

    const api = 'https://to-dos-api.softclub.tj/api/to-dos'
    const imageApi = 'https://to-dos-api.softclub.tj/images/'

    const [data, setData] = useState<Person[]>([])

    async function getData() {
        try {
            const { data } = await axios.get(api)
            setData(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    async function deleteData(id: number) {
        try {
            await axios.delete(api, { params: { id } })
            getData()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Todo List</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map(el => (
                        <TableRow key={el.id}>
                            <TableCell>{el.name}</TableCell>
                            <TableCell>{el.description}</TableCell>
                            <TableCell>{el.isCompleted ? 'active' : 'inactive'}</TableCell>
                            <TableCell>
                                {el.images?.map(img => (
                                    <img src={imageApi + img.imageName} width={90} />
                                ))}
                            </TableCell>
                            <TableCell>
                                <button onClick={() => deleteData(el.id)}>delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default About