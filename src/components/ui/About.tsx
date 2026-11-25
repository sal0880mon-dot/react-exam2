import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'


type FormValues = {
    firstName: string
    lastName: string
    email: string
}

type Person = FormValues & { id: string }

function About() {

    const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

    const [data, setData] = useState<Person[]>([])
    const [editId, setEditId] = useState<string | null>(null)

    async function getData() {
        try {
            const { data } = await axios.get<Person[]>(api)
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
    })
    
    const editData = (el: Person) => {
        setEditId(el.id)
        setValue('firstName', el.firstName)
        setValue('lastName', el.lastName)
        setValue('email', el.email)
    }
    const onSubmit = async (values: FormValues) => {
        try {
            if (editId === null) {
                await axios.post(api, values)
            } else {
                await axios.put(`${api}/${editId}`, values)
                setEditId(null)
            }
            getData()
            reset()
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteData(id: string) {
        try {
            await axios.delete(`${api}/${id}`)
            getData()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <h1>Todo List With React Hook Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('firstName')} type="text" />
                <input {...register('lastName')} type="text" />
                <input {...register('email')} type="text" />
                <button type="submit">{editId === null ? 'submit' : 'save'}</button>
            </form>
            <div>
                {
                    data.map(el => {
                        return <div key={el.id}>
                            <h1>{el.firstName}</h1>
                            <h1>{el.lastName}</h1>
                            <h1>{el.email}</h1>
                            <button onClick={() => deleteData(el.id)}>delete</button>
                            <button onClick={() => editData(el)}>edit</button>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default About