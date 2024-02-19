import React from 'react'

export default function Square({ value, x, y, selectFunc }) { // TODO add a selected state/ data val for when square exists in selected array ? for highlighting after finding valid maybe change class name when selected ? 
    // const [state, setState] = useState(0);//ready/ active 

     return (
       <button className="square" value = {value} data-x = {x} data-y = {y} onClick={selectFunc} >
         {value}
       </button>
     );
   }