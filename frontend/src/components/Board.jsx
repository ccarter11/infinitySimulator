import {useState, useEffect, useRef} from 'react'
import Chunk from './Chunk'
 /* 
    TODO :
     - 9x9 chunks, virtualized, load/unload as user moves, pan-able    
*/
export default function Board({selected,setSelected}) { //add n to param 

    // function calcActive(selected){
        
    //     function calcRelation(start, end){

    //         const xDiff = end[1] - start[1]; 
    //         const yDiff = end[2] - start[2];
    //         const xNorm = xDiff===0? xDiff : xDiff / Math.abs(xDiff); //avoid div by 0 
    //         const yNorm = yDiff===0? yDiff : yDiff / Math.abs(yDiff);

    //         return [xNorm,yNorm];//rel
    //     }


    //     let adj = []; 
    //     const rels = [[0,1] ,[1,0],[1,1],[-1,1]];

    //     switch(selected.length){
    //         case 0: //none selected, all options are valid    
            
    //         break;

    //         case 1: //1 selected, all adjacent options are valid
            
    //         const x = Number(selected[0][1]); 
    //         const y = Number(selected[0][2]); 
            
    //         for(let rel of rels){
    //             //TODO change strings to obj
    //             // adj.push([x+rel[0], y+rel[1] ]);
    //             // adj.push([x-rel[0], y-rel[1]]);
    //             adj.push((x+rel[0]).toString()+'.'+(y+rel[1]));
    //             adj.push((x-rel[0]).toString()+'.'+(y-rel[1]));
    //         } 
    //         break;

    //         default: //2 or more selected, only selections in the defined line are valid
    //         const start = selected[0]; // start.x < end.x
    //         const end = selected[selected.length - 1];
            
    //         const rel = calcRelation(start, end); 

    //         adj.push((end[1] + rel[0]).toString()+'.'+(end[2] + rel[1]));// start <- -/backwards to get letter before
    //         adj.push((start[1] - rel[0]).toString()+'.'+(start[2] - rel[1]));// end ->  +/forwards to get letter after 
    //     }
    //     return adj
    // }

    //const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord 
  //  const [chunks, setChunks] = useState([]) // n x n array of chunk ids 

    //add  (shift + backspace) to remove all selected
    // const handleUndoClick = (e) => {
    //     if(e.keyCode === 8){

    //         if(order[0] > order[order.length-1]){//remove from front
    //             setOrder(order.slice(1,order.length));
    //             setSelected(selected.slice(1,selected.length));
    //             }
    //         else {
    //             setOrder(order.slice(0,order.length-1));
    //             setSelected(selected.slice(0,selected.length-1));}
    //     }
    // }
//-----------------------------------------------------------------------------------------------------------------
    const [order, setOrder] = useState([]) // order added, used to determine which selected element to remove first 
    const adjacent = useRef([]); //legal selections

    const handleClick = (e,adjacent)=>{
        const sData = [ e.target.value , Number(e.target.dataset.x), Number(e.target.dataset.y)]
        //const sData = {value:e.value , x:e.target.dataset.x , y:e.target.dataset.y}

        const cords  = sData[1].toString() +'.' + sData[2].toString();
        // if (adjacent.current.includes([sData[1], sData[2]]) || adjacent.current.length === 0){
        //   setSelected([...selected,sData]);
        if (adjacent.current.includes(cords) || adjacent.current.length === 0){            
            // if none selected or if x cord > biggest selected x cord or y cord > biggest selected y cord -> add to end
            if(selected.length === 0 || sData[1]>selected[selected.length-1][1] || sData[2]>selected[selected.length-1][2]){
                setOrder([...order,order.length]);
                setSelected([...selected,sData]);
            }else{ // add to front
                setOrder([order.length, ...order]);
                setSelected([sData,...selected])
            }
        }else{
            //TODO: signal invalid (ie red flash/shake)
            console.log('invalid selection :(')
        }         
    }

    useEffect(()=>{
        const handleUndoClick = (e) => {
            if(e.keyCode === 8){
    
                if(order[0] > order[order.length-1]){//remove from front
                    setOrder(order.slice(1,order.length));
                    setSelected(selected.slice(1,selected.length));
                    }
                else {
                    setOrder(order.slice(0,order.length-1));
                    setSelected(selected.slice(0,selected.length-1));}
            }
        }
    
        document.addEventListener('keydown',handleUndoClick);
        return () => {
            document.removeEventListener('keydown' , handleUndoClick)
        }
    },[selected, order, setSelected]);

    useEffect(()=>{     
        
        function calcActive(selected){
        
            function calcRelation(start, end){
    
                const xDiff = end[1] - start[1]; 
                const yDiff = end[2] - start[2];
                const xNorm = xDiff===0? xDiff : xDiff / Math.abs(xDiff); //avoid div by 0 
                const yNorm = yDiff===0? yDiff : yDiff / Math.abs(yDiff);
    
                return [xNorm,yNorm];//rel
            }
    
    
            let adj = []; 
            const rels = [[0,1] ,[1,0],[1,1],[-1,1]];
    
            switch(selected.length){
                case 0: //none selected, all options are valid    
                
                break;
    
                case 1: //1 selected, all adjacent options are valid
                
                const x = Number(selected[0][1]); 
                const y = Number(selected[0][2]); 
                
                for(let rel of rels){
                    //TODO change strings to obj
                    // adj.push([x+rel[0], y+rel[1] ]);
                    // adj.push([x-rel[0], y-rel[1]]);
                    adj.push((x+rel[0]).toString()+'.'+(y+rel[1]));
                    adj.push((x-rel[0]).toString()+'.'+(y-rel[1]));
                } 
                break;
    
                default: //2 or more selected, only selections in the defined line are valid
                const start = selected[0]; // start.x < end.x
                const end = selected[selected.length - 1];
                
                const rel = calcRelation(start, end); 
    
                adj.push((end[1] + rel[0]).toString()+'.'+(end[2] + rel[1]));// start <- -/backwards to get letter before
                adj.push((start[1] - rel[0]).toString()+'.'+(start[2] - rel[1]));// end ->  +/forwards to get letter after 
            }
            return adj
        }
    
        adjacent.current = calcActive(selected);
    },[selected]);
  return (
    <div className='board'>
        <Chunk id ={1} handleClick={handleClick} adjacent={adjacent} />
    </div>
    );
}
