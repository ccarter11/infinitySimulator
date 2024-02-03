import { useEffect, useState, useRef } from 'react';
import './style.scss';
import Board from './components/Board';
import Dashboard from './components/DashBoard'
//import './App.css'


function App() {

  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
       {/* <div className="game-board"> */}
        <Board selected={selected} setSelected={setSelected}/>
        <Dashboard selected={selected} />
      {/* </div> */}
    </div>
  );
}

export default App;
