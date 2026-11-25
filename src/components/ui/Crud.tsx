
import { useEffect, useState } from 'react'
import axios from 'axios'

import {
    Table,
    TableBody,
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

function Crud() {
    const api = 'https://to-dos-api.softclub.tj/api/to-dos'
    const imageApi = 'https://to-dos-api.softclub.tj/images/'

    const [data, setData] = useState<Person[]>([])
    const [editId, setEditId] = useState<number | null>(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function getData() {
        try {
            const { data } = await axios.get(api)
            setData(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    async function addData() {
        try {
            await axios.post(api, {
                name,
                description
            })
            setName('')
            setDescription('')
            getData()
        } catch (error) {
            console.error(error)
        }
    }

    function editData(el: Person) {
        setEditId(el.id)
        setName(el.name)
        setDescription(el.description)
    }

    async function saveData() {
        try {
            await axios.put(api, {
                id: editId,
                name,
                description
            })
            setEditId(null)
            setName('')
            setDescription('')
            getData()
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteData(id: number) {
        try {
            await axios.delete(api, { params: { id } })
            getData()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Todo List</h1>

            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <button onClick={editId === null ? addData : saveData}>
                {editId === null ? 'Add' : 'Save'}
            </button>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map(el => (
                        <TableRow key={el.id}>
                            <TableCell>{el.name}</TableCell>
                            <TableCell>{el.description}</TableCell>
                            <TableCell>
                                {el.isCompleted ? 'active' : 'inactive'}
                            </TableCell>
                            <TableCell>
                                {el.images?.map(img => (
                                    <img
                                        key={img.imageName}
                                        src={imageApi + img.imageName}
                                        width={90}
                                        alt=""
                                    />
                                ))}
                            </TableCell>
                            <TableCell>
                                <button onClick={() => editData(el)}>Edit</button>
                                <button onClick={() => deleteData(el.id)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Crud