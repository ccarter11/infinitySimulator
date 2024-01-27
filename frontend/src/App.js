import { useEffect, useState, useRef } from 'react';
import './style.scss';
import Board from './components/Board';
import Dashboard from './components/DashBoard'
//import './App.css'


function App() {
 
  // function Square({ value, x, y, selectFunc }) { // TODO add a selected state/ data val for when square exists in selected array ? for highlighting after finding valid maybe change class name when selected ? 
  //  // const [state, setState] = useState(0);//ready/ active 

  //   return (
  //     <button className="square" value = {value} data-x = {x} data-y = {y} onClick={selectFunc} >
  //       {value}
  //     </button>
  //   );
  // }

  // function calcRelation(start, end){
  //   /* 
  //     summary:
  //         Calculates the 
  //     args:

  //     returns: 
      
  //   */
  //   const xDiff = end[1] - start[1]; 
  //   const yDiff = end[2] - start[2];
  //   const xNorm = xDiff===0? xDiff : xDiff / Math.abs(xDiff); //avoid div by 0 
  //   const yNorm = yDiff===0? yDiff : yDiff / Math.abs(yDiff);
  //   console.log(yNorm)
  //   return [xNorm,yNorm];//rel
  // }

  // function calcActive(selected){
  //      /* 
  //     summary:

  //     args:

  //     returns: 
      
  //   */
  //   let adj = []; 
  //   const rels = [[0,1] ,[1,0],[1,1],[-1,1]];

  //   switch(selected.length){
  //       case 0: //none selected, all options are valid    
        
  //       break;

  //       case 1: //1 selected, all adjacent options are valid
          
  //         const x = Number(selected[0][1]); 
  //         const y = Number(selected[0][2]); 
          
  //         for(let rel of rels){
  //           // adj.push([x+rel[0], y+rel[1] ]);
  //           // adj.push([x-rel[0], y-rel[1]]);
  //           adj.push((x+rel[0]).toString()+'.'+(y+rel[1]));
  //           adj.push((x-rel[0]).toString()+'.'+(y-rel[1]));
  //         } 
  //       break;

  //       default: //2 or more selected, only selections in the defined line are valid
  //         const start = selected[0]; // xStart < xEnd
  //         const end = selected[selected.length - 1];
       
  //         const rel = calcRelation(start, end); 
  //         console.log(rel)
  //         adj.push((end[1]+rel[0]).toString()+'.'+(end[2]+rel[1]));// start <- -/backwards to get letter before
  //         adj.push((start[1]-rel[0]).toString()+'.'+(start[2]-rel[1]));// end ->  +/forwards to get letter after 

  //     }
  //   return adj
  // }

  

  // function Board() {

  // //   const [board_letters, setBoard] = useState([]); //move to chunk, 

  // //   useEffect(() => {
  // //     // Using fetch to fetch the api from 
  // //     // flask server it will be redirected to proxy
  // //     fetch("/data").then((res) =>
  // //         res.json().then((data) => {
  // //             // Setting a data from api
  // //             setBoard(data);
  // //         })
  // //     );
  // // }, []);
    
  
  //   const adjacent = useRef([]);
  //   const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord


  //   const handleUndoClick = (e) => {
  //     if(e.keyCode === 8){
  //       setSelected(selected.slice(0,selected.length-1))
  //     }
  //   }

  //   const handleClick = (e,adjacent)=>{
  //     const sData = [ e.target.value , Number(e.target.dataset.x), Number(e.target.dataset.y)]
  //     console.log(adjacent.current)
  //     //const sData = {value:e.value , x:e.target.dataset.x , y:e.target.dataset.y}
   
  //     const cords  = sData[1].toString() +'.' + sData[2].toString();
  //     // if (adjacent.current.includes([sData[1], sData[2]]) || adjacent.current.length === 0){
  //     //   console.log(true)
  //     //   setSelected([...selected,sData]);
  //     if (adjacent.current.includes(cords) || adjacent.current.length === 0){
  //       //TODO Sort selected by x cord function
  //       setSelected([...selected,sData]);
  //     }else{
  //       //TODO: signal invalid (ie red flash/shake)
  //       console.log('invalid selection :(')
  //     }
            
  // }

  
  //   useEffect(()=>{
  //     document.addEventListener('keydown',handleUndoClick);
  //     return () => {
  //       document.removeEventListener('keydown' , handleUndoClick)
  //     }
  //   },[selected]);

  //   useEffect(()=>{      
  //     adjacent.current = calcActive(selected);
  //     //console.log(adjacent.current);
  //   },[selected]);
    

   
    
  //   const n = 10; 
  
  //   return (
  //     <>
      
  //     <div className='board'>
  //       {/* <div className='chunk'>
  //       {[...new Array(n)].map((x, rowIndex) => {
  //         return (
  //           <div className="board-row" key={rowIndex}>
  //             {[...new Array(n)].map((y, colIndex) => {  
  //               const xCord = colIndex;
  //               return(
  //                 //TODO: add values from file   board_letters[colIndex*n + rowIndex]
  //                 <Square key ={colIndex.toString() +"."+rowIndex.toString()} value={ board_letters[colIndex*n + rowIndex]}  x={xCord} y={rowIndex}  
  //                 selectFunc={(e)=>handleClick(e,adjacent)} /> )} )}
  //           </div>
  //         )
  //       })
  //       }
  //       </div> */}
  //   </div>
  //   <div> 
  //     {selected}
  //   </div>
  //     </>
  //   );
  // }

  return (
    <div className="App">
       {/* <div className="game-board"> */}
        <Board />
        <Dashboard />
      {/* </div> */}
    </div>
  );
}

export default App;
