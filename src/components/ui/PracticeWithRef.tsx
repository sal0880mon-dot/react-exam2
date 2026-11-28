import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "./ThemeContext";

const api = 'https://6ace4295f338359cf1c358b1.mockapi.io/1234'

type Todo = {
    id: number
    name: string
}

const PracticeWithRef = () => {
    const inpRef = useRef<HTMLInputElement>(null)
    const addRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const tasksRef = useRef<HTMLDivElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    
    const cntRef = useRef(0)

    const {theme,toggleTheme}=useContext(ThemeContext)

    function increment() {
        cntRef.current++
        console.log(cntRef.current);
        
    }
    function decrement() {
        cntRef.current--
        console.log(cntRef.current);
        
    }

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState<Todo[]>([])

    async function getData() {
        try {
            const { data } = await axios.get(api)
            setData(data)
            setFilteredData(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
        inpRef.current?.focus()
    }, [])

    async function addData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const name = addRef.current?.value
        if (!name?.trim()) return
        try {
            await axios.post(api, { name })
            getData()
            addRef.current.value = ''
        } catch (error) {
            console.error(error);
        }
    }

    function btnRenameColor() {
        if (titleRef.current) {
            titleRef.current.style.color = 'red'
        }
    }

    function scrollToTasks() {
        if (tasksRef.current) {
            tasksRef.current.scrollIntoView({ behavior: 'smooth' })
        }

    }

    function searchData() {
        const searchValue = inpRef.current?.value.toLowerCase()

        const result = data.filter(el => el.name.toLowerCase().includes(searchValue || ''))
        setFilteredData(result)
    }

    function openFile() {
        fileRef.current?.click()
    }
    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} min-h-[300px] p-8`}>
            <h1 ref={titleRef}>Todo List</h1>
            <button onClick={toggleTheme} >
                {theme=='light'?'Dark':'Light'}
            </button>
            <button onClick={btnRenameColor}>Change color</button>
            <input type="search" placeholder="search" ref={inpRef} />
            <button onClick={searchData}>Search</button>
            <button onClick={() => {
                setFilteredData(data)
                if (inpRef.current) {
                    inpRef.current.value = ''
                }
            }}>
                Reset
            </button>
            <form onSubmit={addData}>
                <input type="text" placeholder="add name" ref={addRef} />
            </form>

            <input type="file" ref={fileRef} className="hidden" />
            <button onClick={openFile}>Выбрать файл</button>
            
            <div ref={tasksRef} className="p-[10px]">
                {
                    filteredData.map(el => {
                        return (
                            <div key={el.id} className="p-[50px]">
                                <h1>{el.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={scrollToTasks}>Go to tasks</button>
            <br />
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}
export default PracticeWithRef