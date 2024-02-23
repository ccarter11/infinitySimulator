import { useEffect, useState } from "react"

export default function DashBoard({selected}) {

    const letters = selected.map((x) =>{return x[0]})
    const [disable,setDisable] = useState(1)

    useEffect(()=>{
      if (selected.length>=3){
        setDisable(0)
      }else{
        setDisable(1)
      }
    },[selected])

  return (
    <div className='dashBoard'>
      <div className="entry">
        <div>{letters}</div>
        <button className="enter" disabled={disable} >
          Enter
        </button>
      </div>
        
        {/* 
        nav (-> personal/global stats, analytics, account . . .)
        entry (-> selected letters , submit button )
        sessionStats (-> recently found words, total session score)
         */}
    </div>
  )
}
