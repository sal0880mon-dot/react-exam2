

import { useState,useEffect } from 'react';
import { useFormik } from 'formik'
import axios from 'axios';

const AsyncCrudWithFormik = () => {
    const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

    type Person = {
        id: string
        firstName: string
        lastName: string
        email: string
    }

    const [data, setData] = useState<Person[]>([])
    const [editId, setEditId] = useState<string | null>(null)

    async function getData() {
        try {
            const {data}=await axios.get<Person[]>(api)
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        getData()
    },[])

    async function deleteData(id: string) {
        try {
            await axios.delete(`${api}/${id}`)
            getData()
        } catch (error) {
            console.error(error);
        }
    }

    

    const { values, handleChange, handleSubmit, setValues, resetForm } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: async values => {
            if (editId === null) {
                try {
                    await axios.post<Person[]>(api,values)
                    getData()
                    resetForm()
                } catch (error) {
                    console.error(error);
                }
                setData(prev => [...prev, { ...values, id: String(Date.now()) }])
            } else {
                try {
                    await axios.put(`${api}/${editId}`,values)
                    getData()
                    setEditId(null)
                    resetForm()
                } catch (error) {
                    console.error(error);
                }
            }
        },
    });

    const editData = (el: Person) => {
        setEditId(el.id)
        setValues(
            {
                firstName: el.firstName,
                lastName: el.lastName,
                email: el.email
            })
    }

    return (
        <div>
            <h1>Async Todo List With Formik</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={values.firstName} name='firstName' type="text" />
                <input onChange={handleChange} value={values.lastName} name='lastName' type="text" />
                <input onChange={handleChange} value={values.email} name='email' type="text" />
                <button type="submit">{editId === null ? 'submit' : 'save'}</button>
            </form>
            <div>
                {
                    data.map(el => {
                        return <div key={el.id}>
                            <h1>{el.firstName}</h1>
                            <h1>{el.lastName}</h1>
                            <h1>{el.email}</h1>
                            <button onClick={() => editData(el)}>edit</button>
                            <button onClick={() => deleteData(el.id)}>delete</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default AsyncCrudWithFormik