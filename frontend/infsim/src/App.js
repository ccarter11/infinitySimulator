import { useState } from 'react';
import './App.css';

function App() {
  //TODO: make square component  with change state function(?)
  function Square({ value, select, xCord, yCord, state }) { 
    return (
      <button className="square" onClick={select}>
        {value}
      </button>
    );
  }
  
  function calcState(state){ // handle 3 state setting ?

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
   // const [state, setState] = useState(0);
    const [selected, setSelected] = useState([]);
    const rowCount = 10,   colCount = 10;
    const handleSelect = ()=>{
      setSelected([...selected, "S"])
    }
    return (
      <>
      <div>
        {[...new Array(rowCount)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(colCount)].map((y, colIndex) => 
                  <Square value={"A"} select={handleSelect} xCord={colIndex} yCord={rowIndex}/> )} 
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
