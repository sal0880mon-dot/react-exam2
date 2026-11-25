
import {useForm} from 'react-hook-form'
const CrudWithRHF = () => {

    const {register,handleSubmit,reset}=useForm({
        defaultValues:{
            firstName:'',
            lastName:'',
            email:'',
        }
    })
    return (
        <>
        </>
    )
}

export default CrudWithRHF