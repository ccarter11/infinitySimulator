import {useState, useEffect, useRef} from 'react'
import Chunk from './Chunk'
 /* 
    TODO :
     - 9x9 chunks, virtualized, load/unload as user moves, pan-able    
     - 
*/
export default function Board({selected,setSelected}) { //add n to param 

        
    function calcRelation(start, end){
        /* 
        summary:
            Calculates the direction of the line of letters currently selected
        args:
                start: cords of first letter
                end: cords of last letter

        returns: 
                the relation, 'rel', that the current word follows
                (horizontal ->  1 , 0 / vertical -> 0 , 1 / left diagonal -> 1 , 1 / right diagonal -> -1 , 1)
        
        */
        const xDiff = end[1] - start[1]; 
        const yDiff = end[2] - start[2];
        const xNorm = xDiff===0? xDiff : xDiff / Math.abs(xDiff); //avoid div by 0 
        const yNorm = yDiff===0? yDiff : yDiff / Math.abs(yDiff);
        console.log(yNorm)
        return [xNorm,yNorm];//rel
    }

    function calcActive(selected){
            /* 
        summary:
            define list of valid button selections based on adjacency
        args:
            selects: cords of selected letters
        returns: 
            adj: the cord options for the next possible selection
        
        */

        //TODO:: fix direction change bug for default case -- maybe based on lack of sorting?? add to front if <  add to end if > 
        let adj = []; 
        const rels = [[0,1] ,[1,0],[1,1],[-1,1]];

        switch(selected.length){
            case 0: //none selected, all options are valid    
            
            break;

            case 1: //1 selected, all adjacent options are valid
            
            const x = Number(selected[0][1]); 
            const y = Number(selected[0][2]); 
            
            for(let rel of rels){
                //TODO change strings to arrays
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
            console.log(rel)
            adj.push((end[1]+rel[0]).toString()+'.'+(end[2]+rel[1]));// start <- -/backwards to get letter before
            adj.push((start[1]-rel[0]).toString()+'.'+(start[2]-rel[1]));// end ->  +/forwards to get letter after 

        }
        return adj
    }


    const adjacent = useRef([]); //legal selections
    //const [selected, setSelected] = useState([]); // array of selected letters, sorted by x cord 
  //  const [chunks, setChunks] = useState([]) // n x n array of chunk ids 

    const handleUndoClick = (e) => {
        if(e.keyCode === 8){
            setSelected(selected.slice(0,selected.length-1))
        }
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
    },[selected]);



  return (
    <>
    <div className='board'>
        <Chunk id ={1} handleClick={handleClick} adjacent={adjacent} />
    </div>
    </>
    );
}
