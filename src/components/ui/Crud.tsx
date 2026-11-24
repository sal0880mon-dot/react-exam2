


import { useState } from 'react';
import { useFormik } from 'formik'

function Crud() {
    type Person = {
        id: number
        firstName: string
        lastName: string
        email: string
    }

    const [data, setData] = useState<Person[]>([])
    const [editId, setEditId] = useState<number | null>(null)


    const deleteData = (id: Number) => {
        setData(prev => prev.filter(el => el.id !== id))
    }

    const { values, handleChange, handleSubmit, setValues, resetForm  } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            if (editId === null) {
                setData(prev => [...prev, { ...values, id: Date.now() }])
            } else {
                setData(prev => prev.map(el => el.id === editId ? { ...el, ...values } : el))
                setEditId(null)
            }
            resetForm ()
        },
    });

    const editData = (el: Person) => {
        setEditId(el.id)
        setValues({ firstName: el.firstName, lastName: el.lastName, email: el.email })
    }
    return (
        <>
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
        </>

    )
}

export default Crud