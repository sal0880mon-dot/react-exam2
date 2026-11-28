import { useState } from "react"
import Empty from "./Empty"

const PracticeMemo = () => {
    const [cnt,setCnt]=useState(0)
    console.log('cnt re-renders');
    
  return (
    <div>
        <h1>PracticeMemo</h1>
        <button onClick={()=>setCnt(cnt+1)}>{cnt}</button>
        <Empty/>
    </div>
  )
}

export default PracticeMemo