import { useEffect, useState, useRef } from 'react';
import './App.css';


function App() {
  
  function Square({ value, x, y, selectFunc }) { // TODO add a selected state/ data val for when square exists in selected array ? for highlighting after finding valid maybe change class name when selected ? 
   // const [state, setState] = useState(0);//ready/ active 

    return (
      <button className="square" value = {value} data-x = {x} data-y = {y} onClick={selectFunc} >
        {value}
      </button>
    );
  }

  function calcRelation(start, end){
    const xDiff = end[1] - start[1]; 
    const yDiff = end[2] - start[2];
    const xNorm = xDiff===0? xDiff : xDiff / Math.abs(xDiff); //avoid div by 0 
    const yNorm = yDiff===0? yDiff : yDiff / Math.abs(yDiff);
    console.log(yNorm)
    return [xNorm,yNorm];//rel
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
            // adj.push([x+rel[0], y+rel[1] ]);
            // adj.push([x-rel[0], y-rel[1]]);
            adj.push((x+rel[0]).toString()+'.'+(y+rel[1]));
            adj.push((x-rel[0]).toString()+'.'+(y-rel[1]));
            
          }
          
        break;

        default: //2 or more 
          const start = selected[0]; // xStart < xEnd
          const end = selected[selected.length - 1];
       
          const rel = calcRelation(start, end); 
          console.log(rel)
          adj.push((end[1]+rel[0]).toString()+'.'+(end[2]+rel[1]));// start <- -/backwards to get letter before
          adj.push((start[1]-rel[0]).toString()+'.'+(start[2]-rel[1]));// end ->  +/forwards to get letter after 

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

    const adjacent = useRef([]);
    const letters = useRef( Array.from({ length: 10**2 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)))
    const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord


    const handleUndoClick = (e) => {
      if(e.keyCode === 8){
        console.log(selected)
        setSelected(selected.slice(0,selected.length-1))
      }
      console.log(selected)
    }

    const handleClick = (e,adjacent)=>{
      const sData = [ e.target.value , Number(e.target.dataset.x), Number(e.target.dataset.y)]
      console.log(adjacent.current)
      //const sData = {value:e.value , x:e.target.dataset.x , y:e.target.dataset.y}
   
      const cords  = sData[1].toString() +'.' + sData[2].toString();
      // if (adjacent.current.includes([sData[1], sData[2]]) || adjacent.current.length === 0){
      //   console.log(true)
      //   setSelected([...selected,sData]);
      if (adjacent.current.includes(cords) || adjacent.current.length === 0){
        //TODO Sort selected by x cord function
        setSelected([...selected,sData]);
      }else{
        //TODO: signal invalid (ie red flash/shake)
        console.log('invalid selection :(')
      }
            
  }

  
    useEffect(()=>{
      document.addEventListener('keydown',handleUndoClick);
      return () => {
        document.removeEventListener('keydown' , handleUndoClick)
      }
    },[selected]);

    useEffect(()=>{      
      adjacent.current = calcActive(selected);
      //console.log(adjacent.current);
    },[selected]);
    

    const n = 10;
    
    const count = n; 

    //letters[rowIndex*n + colIndex]
    
    return (
      <>
      
      <div>
        {[...new Array(count)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(count)].map((y, colIndex) => {  
                const xCord = colIndex;
                return(
                  //TODO: add values from file 
                  <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={letters[colIndex*n + rowIndex]}  x={xCord} y={rowIndex}  
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
