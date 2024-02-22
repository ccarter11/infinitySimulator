import {useEffect,useState} from 'react'
import Square from './Square';

export default function Chunk({id,handleClick,adjacent}) {
      // fetch chunk data on initial load
      const [letters,setLetters] = useState([])

      useEffect(() => {
        fetch("/data").then((res) =>
            res.json().then((data) => {
                setLetters(data);
            })
        );
    }, []);

  let squares = [];
  const n  = Math.sqrt(letters.length)
  for (let colIndex = 0; colIndex<n; colIndex++){
    for(let rowIndex = 0; rowIndex<n; rowIndex++){
            squares.push(<Square key ={colIndex.toString() +"."+rowIndex.toString()} value={ letters[colIndex*n + rowIndex]}  x={colIndex} y={rowIndex}  
            selectFunc={(e) => handleClick(e,adjacent)} /> )
}}

  return (
        <div className='chunk'>
        {squares}
    </div>
  )
}