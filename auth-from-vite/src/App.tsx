import './App.css'
import Board from './Board'
import { useState } from 'react'

type BoardSet = number[][];

function App() {
  // 7 columns with 6 rows each, initialized to 0
  const initialBoardSet:BoardSet = Array.from({ length: 7 }, () => Array(6).fill(0)) as BoardSet;
  const [boardSet, setBoardSet] = useState<BoardSet>(initialBoardSet);
  const [player, setPlayer] = useState(1); // Player 1 starts

  const roomLeft = boardSet.map(col => col.filter(cell => cell === 0).length);
  const winner = checkWinCondition(boardSet);

  const dropCoin = (colIndex: number) => {
    const newBoardSet = [...boardSet];
    const column = newBoardSet[colIndex];
    const emptyIndex = column.lastIndexOf(0); // Find the last empty slot in the column
    if (emptyIndex !== -1) {  // If there is an empty slot
      column[emptyIndex] = player; // Place the player's coin in the empty slot
      setBoardSet(newBoardSet); // Update the board state
    } else {
      console.error(`Column ${colIndex} is full, cannot drop coin.`);
    }
  };

  const handleClick = function (colIndex: number) {
    //console.log(`Column clicked: ${colIndex}`);
    if (roomLeft[colIndex] > 0 && winner === 0) {
      //console.log(`Column ${colIndex} has room, dropping coin.`);
      dropCoin(colIndex);
      // Switch player after a successful drop
      setPlayer(prevPlayer => prevPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <>
      <h1>Connect 4</h1>
      <Board boardSet={boardSet} onClick={handleClick}/>
      {winner > 0 ? 
        <h2>Player {winner} wins!</h2>
        : 
        <h2>Player {player}'s turn</h2>
      }
    </>
  )
}

const checkWinCondition = function (boardSet: BoardSet) {
  // @todo: Implement actual fonction through TDD
  let winner = 0;
  // Check for win conditions here (not implemented in this example)
  if (boardSet[0][5] === 1 && boardSet[1][5] === 1 && boardSet[2][5] === 1 && boardSet[3][5] === 1) {
    winner = 1;
  }
  return winner;
}

export default App
