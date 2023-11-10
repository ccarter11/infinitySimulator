import { useEffect, useState, useRef } from 'react';
import './App.css';


function App() {
  
  function Square({ value, x, y, selectFunc }) { 
   // const [state, setState] = useState(0);//ready/ active 

    // if (selected.length ===1){  //hook to update state of square when seleced changes? 

    // }
  
    return (
      <button className="square" value = {value} data-x = {x} data-y = {y} onClick={selectFunc} >
        {value}
      </button>
    );
  }

  function calcRelation(start, end){

  }

  function calcActive(selected){
    let adj = []; 
    const rels = [[0,1] ,[1,0],[1,1],[-1,1]];
    switch(selected.length){
        case 0:         
        
        break;

        case 1:
          
          const x = Number(selected[0][1]); 
          const y = Number(selected[0][2]); 
          
          for(let rel of rels){
            adj.push([x+rel[0], y+rel[1] ]);
            adj.push([x-rel[0], y-rel[1]]);
          }
          
        break;

        default: //2 or more 
          const start = selected[0]; 
          const end = selected[-1];
          const rel = calcRelation(start, end); 

      }
    return adj
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

   
                
    

    const handleClick = (e,adjacent)=>{
      // console.log(e.target)
      // console.log(adjacent)
      

      const sData = [ e.value , Number(e.target.dataset.x), Number(e.target.dataset.y)]
      //const sData = {value:e.value , x:e.target.dataset.x , y:e.target.dataset.y}
      console.log(sData[1],sData[2])
      console.log(adjacent.current.includes([sData[1],sData[2]]))
      if (adjacent.current.includes([sData[1], sData[2]]) || adjacent.current.length === 0){
        console.log(true)
        setSelected([...selected,sData]);
      }else{
        //flash red ? 
      }
      
  }

    const adjacent = useRef([]);
    const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord

    useEffect(()=>{
      adjacent.current = calcActive(selected);
      //console.log(adjacent.current);
    },[selected]);

    const rowCount = 12,   colCount = 12; 
    return (
      <>
      <div>
        {[...new Array(rowCount)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(colCount)].map((y, colIndex) => {  
                const xCord = colIndex;
                return(
                  <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={"A"}  x={xCord} y={rowIndex} 
                  selectFunc={(e)=>handleClick(e,adjacent)} /> )} )}
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
