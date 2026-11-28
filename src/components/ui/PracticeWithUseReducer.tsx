import { useContext, useReducer } from "react"
import { data } from "react-router"
import { ThemeContext } from "./ThemeContext"

export const initialState = {
    value: 0,
    data: [{ id: 1, name: 'Salmon', status: false }]
}

type Person={
    id:number
    name:string
}

export function reducer(state:any, action:any) {
    if (action.key == 'delete') {
        return { data: state.data.filter(el => el.id != action.value) }
    }
    if (action.key == 'edit') {
        return { data: state.data.map(el => el.id == action.value.id ? action.value : el) }
    }
    if (action.key == 'add') {
        return { data: [...state.data,action.value] }
    }
    return state
}

export const PracticeWithUseReducer = () => {
    const {theme,toggleTheme}=useContext(ThemeContext)
    const [state, dispanch] = useReducer(reducer, initialState)
    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} min-h-[300px] p-8`}>
            <h1>Todo List</h1>
            <button onClick={toggleTheme}>
                {theme=='light'?'dark':'light'}
            </button>
            <div>
                <form
                    onSubmit={ev => {
                        ev.preventDefault()
                        let obj = {
                            id: Date.now(),
                            name: ev.target.name.value,
                            status: false
                        }
                        dispanch({ key: 'add', value: obj })
                    }}
                >
                    <input type="text" name="name" />
                    <button>submit</button>
                </form>
            </div>
            {
                state.data.map(el => {
                    return <div>
                        <h1>{el.name}</h1>
                        <button onClick={() => dispanch({ key: 'delete', value: el.id })}>delete</button>
                        <h3>{el.status ? 'active' : 'inactive'}</h3>
                        <input type="checkbox" checked={el.status} name="" onChange={() => dispanch({ key: 'edit', value: { ...el, status:!el.status } })} />
                    </div>
                })
            }
        </div>
    )
}