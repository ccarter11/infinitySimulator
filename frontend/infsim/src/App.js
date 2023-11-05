import { useState } from 'react';
import './App.css';


function App() {
  
  function Square({ value, x, y, selectFunc }) { 
    const [state, setState] = useState(0);//ready/ active 

    // if (selected.length ===1){  //hook to update state of square when seleced changes? 

    // }
  
    return (
      <button className="square" value = {value} data-x = {x} data-y = {y} onClick={selectFunc} >
        {value}
      </button>
    );
  }

  function Board() {//{ xIsNext, squares, onPlay }
    // function handleClick(i) {
    //   const nextSquares = squares.slice();
    //   if (xIsNext) {
    //     nextSquares[i] = 'X';
    //   } else {
    //     nextSquares[i] = 'O';
    //   }
    //   onPlay(nextSquares);
    // }

   
 
    

    const handleClick = (e)=>{
      console.log(e.target)
      console.log("x =" , e.target.dataset.x);

      const sData = [ e.value ,  e.target.dataset.x, e.target.dataset.y]
     
      switch(selected.length){
        case 0:         
        setSelected([...selected,sData]);
        break;

        case 1:

        break;

        default:

      }
  }
    const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord
    const rowCount = 12,   colCount = 10; 
    return (
      <>
      <div>
        {[...new Array(rowCount)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(colCount)].map((y, colIndex) => {  
                const xCord = colIndex;
                return(
                  <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={"A"}  x={xCord} y={rowIndex} selectFunc={handleClick} /> )} )}
            </div>
          )
        })
        }
    </div>
    <div> 
      {selected}
    </div>
      </>
    );
  }

  return (
    <div className="App">
       <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default App;
