import {useEffect,useState} from 'react'
import Square from './square';
 /* 
      summary:
            n x n unit of Squares
      args:
            id: chunk id number
            n: height and width of Chunk
            handleClick: function that handles the selection of a Square
            adjacent: state array of legal selections
      returns: 
            Chunk
    */

  export default function Chunk({id,handleClick,adjacent}) {
      // fetch chunk data on initial load
      const [letters, setLetters] = useState([]);
      useEffect(() => {
        fetch("/data").then((res) =>
            res.json().then((data) => {
                setLetters(data);
            })
        );
    }, []);
  
  const n  = Math.sqrt(letters.length)
  console.log('n' , n )
  
  return (
    //populate n x n buttons with letters
    <div className='chunk'>
        {[...new Array(n)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(n)].map((y, colIndex) => {  
                const xCord = colIndex;
                return(
                  <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={ letters[colIndex*n + rowIndex]}  x={xCord} y={rowIndex}  
                  selectFunc={(e)=>handleClick(e,adjacent)} /> )} )}
            </div>
          )
        })
        }
    </div>
  )
}
