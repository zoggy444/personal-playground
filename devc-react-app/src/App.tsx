import { useState } from 'react'
import './App.css'
import Board from "./Board.tsx"

function App() {
  const [status, setStatus] = useState("playing");

  const updateStatus = function (status) {
    setStatus(status);
  }

  const handleRestart= function () {

  }

  return (
    <>
      <Board status={status} setStatus={setStatus}/>
      {status == 'won' && <div>GAGNÉ!!!</div>}
      {status == 'lost' && <div>PERDU</div>}
      <button name="restart" onClick={handleRestart}>restart</button>
    </>
  );
}

export default App
