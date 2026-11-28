
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table"

import { ThemeContext } from './ThemeContext'

type Person = {
    id: number
    name: string
    description: string
    isCompleted: boolean
    images: { imageName: string }[]
}

const schema = z.object({
    name: z.string().min(3, 'minimum 3 leters'),
    description: z.string().min(3, 'minimum 3 leters')
})

type FormValues = z.infer<typeof schema>

function Crud() {
    const api = 'https://to-dos-api.softclub.tj/api/to-dos'
    const imageApi = 'https://to-dos-api.softclub.tj/images/'

    const {theme,toggleTheme}=useContext(ThemeContext)

    const [data, setData] = useState<Person[]>([])
    const [editId, setEditId] = useState<number | null>(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })

    async function getData() {
        const { data } = await axios.get(api)
        setData(data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    async function onSubmit(values: FormValues) {
        if (editId === null) {
            await axios.post(api, values)
        } else {
            await axios.put(api, { id: editId, ...values })
            setEditId(null)
        }
        reset()
        getData()
    }

    function editData(el: Person) {
        setEditId(el.id)
        reset({
            name: el.name,
            description: el.description
        })
    }

    async function deleteData(id: number) {
        await axios.delete(api, { params: { id } })
        getData()
    }

    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} min-h-[300px] p-8`}>
            <h1>Todo List</h1>
            <button onClick={toggleTheme} >
                {theme=='light'?'Dark':'Light'}
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Name" {...register('name')} />
                <p>{errors.name?.message}</p>

                <input placeholder="Description" {...register('description')} />
                <p>{errors.description?.message}</p>

                <button type="submit">
                    {editId === null ? 'Add' : 'Save'}
                </button>
            </form>

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
                            <TableCell>{el.isCompleted ? 'active' : 'inactive'}</TableCell>

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
        </div>
    )
}

export default Crud