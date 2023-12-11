import {useEffect,useState} from 'react'

 /* 
      summary:
            n x n unit of Squares
      args:
            n: height and width of Chunk
            handleClick: function that handles the selection of a Square
            adjacent: state array of legal selections
      returns: 
            Chunk
    */

export default function Chunk({n,handleClick,adjacent}) {
    
    const [letters, setLetters] = useState([]);
    useEffect(() => {
      fetch("/data").then((res) =>
          res.json().then((data) => {
              setLetters(data);
          })
      );
  }, []);
    
  return (
    <div className='chunk'>
        {[...new Array(n)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(n)].map((y, colIndex) => {  
                const xCord = colIndex;
                return(
                  //TODO: add values from file   board_letters[colIndex*n + rowIndex]
                  <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={ letters[colIndex*n + rowIndex]}  x={xCord} y={rowIndex}  
                  selectFunc={(e)=>handleClick(e,adjacent)} /> )} )}
            </div>
          )
        })
        }
    </div>
  )
}
