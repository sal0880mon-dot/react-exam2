
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Input } from './input';

function Crud() {

    interface obj {
        id: number
        name: string
        status: boolean
        avatar:any
    }

    const [data, setData] = useState<obj[]>([])

    const [editId, setEditId] = useState<number | null>(null)

    const [name, setName] = useState('')

    const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

    async function getData() {
        try {
            const { data } = await axios.get(api)
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteData(id: number) {
        try {
            await axios.delete(`${api}/${id}`)
            getData()
        } catch (error) {
            console.error(error);
        }
    }

    async function addData(event: any) {
        event.preventDefault()
        const newUser = {
            name: event.target.name.value
        }
        try {
            await axios.post<obj[]>(api, newUser)
            getData()
        } catch (error) {
            console.error(error);
        }
        event.target.reset()
    }

    async function editData(event: any) {
        event.preventDefault()
        const updateData = {
            name: event.target.name.value
        }
        try {
            await axios.put(`${api}/${editId}`, updateData)
            getData()
        } catch (error) {
            console.error(error);
        }
        setName('')
        setEditId(null)
    }

    async function searchData(value: string) {
        try {
            const { data } = await axios.get<obj[]>(api)
            const filtered = data.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
            setData(filtered)
        } catch (error) {
            console.error(error);
        }
    }

    async function selectSearchData(value: string) {
        try {
            const { data } = await axios.get<obj[]>(api)
            const filtered = data.filter(el => el.status.toString().includes(value))
            setData(filtered)
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <form onSubmit={addData}>
                <Input type="text" name='name' placeholder='add name' />
                <Button type='submit'>add</Button>
            </form>

            <form onSubmit={editData}>
                <Input onChange={el => setName(el.target.value)} type="text" name='name' placeholder='edit name' value={name} />
                <Button type='submit'>edit</Button>
            </form>

            <div className='flex p-10 '>
                <Input type="search" placeholder='search' onChange={el => searchData(el.target.value)} />

                <select onChange={el => selectSearchData(el.target.value)}>
                    <option value="all">All</option>
                    <option value="true">Active</option>
                    <option value="false">Iactive</option>
                </select>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>status</th>
                        <th>avatar</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>{data.map(el => {
                    return <tr key={el.id}>
                        <td>{el.name}</td>
                        <td>{el.status ? "Active" : "Inactive"}</td>
                        <td>
                            <div className='w-10'><img src={el.avatar} width={'100%'}/></div>
                        </td>
                        <td>
                            <Button onClick={() => { setEditId(el.id), setName(el.name) }} className={'bg-blue-700'}>edit</Button>
                            <Button onClick={() => deleteData(el.id)} className={'bg-red-700'}>delete</Button>
                        </td>
                    </tr>
                })}</tbody>
            </table>

        </>
    )
}

export default Crud