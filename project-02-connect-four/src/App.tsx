import './App.css'
import Board from './Board'
import { useState } from 'react'

type BoardSet = number[][];
type PreconfProps = {
  preconfBoardSet?: BoardSet;
}
type WinType = 'horizontal' | 'vertical' | 'diagonal' | undefined;

function App({preconfBoardSet} : PreconfProps) {
  // 7 columns with 6 rows each, initialized to 0
  const initialBoardSet:BoardSet = preconfBoardSet || Array.from({ length: 7 }, () => Array(6).fill(0)) as BoardSet;
  const [boardSet, setBoardSet] = useState<BoardSet>(initialBoardSet);
  // implied state
  const player = playerTurn(boardSet); // Determine the current player, -1 if invalid
  const roomLeft = boardSet.map(col => col.filter(cell => cell === 0).length);
  const [winner, winType] = checkWinCondition(boardSet);

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
    if (roomLeft[colIndex] > 0 && winner === 0) {
      dropCoin(colIndex);
    }
  };

  return (
    <>
      <h1>Connect 4</h1>
      <Board boardSet={boardSet} onClick={handleClick}/>
      {winner > 0 ? 
        <h2>Player {winner} wins with a {winType} win!</h2>
        : 
        <h2>Player {player}'s turn</h2>
      }
    </>
  )
}

function checkWinCondition (boardSet: BoardSet): [number, WinType] {
  const nbCol = boardSet.length;
  const nbRow = boardSet[0].length;
  let winner = 0;
  let winType: WinType;

  // Check horizontal win
  for (let col = 0; col < nbCol-3; col++) {
    for (let row = 0; row < nbRow; row++) {
      if (boardSet[col][row] !== 0 && 
          boardSet[col][row] === boardSet[col + 1][row] &&
          boardSet[col][row] === boardSet[col + 2][row] &&
          boardSet[col][row] === boardSet[col + 3][row]) {
        winner = boardSet[col][row];
        winType = 'horizontal';
        return [winner, winType];
      }
    }
  }
  if (winner > 0) return [winner, winType];

  // Check vertical win
  for (let col = 0; col < nbCol; col++) {
    for (let row = 0; row < nbRow - 3; row++) {
      if (boardSet[col][row] !== 0 && 
          boardSet[col][row] === boardSet[col][row + 1] &&
          boardSet[col][row] === boardSet[col][row + 2] &&
          boardSet[col][row] === boardSet[col][row + 3]) {
        winner = boardSet[col][row];
        winType = 'vertical';
        return [winner, winType];
      }
    }
  }
  if (winner > 0) return [winner, winType];

  // Check diagonal win (bottom-right to top-left)
  for (let col = 0; col < nbCol - 3; col++) {
    for (let row = 0; row < nbRow - 3; row++) {
      if (boardSet[col][row] !== 0 && 
          boardSet[col][row] === boardSet[col + 1][row + 1] &&
          boardSet[col][row] === boardSet[col + 2][row + 2] &&
          boardSet[col][row] === boardSet[col + 3][row + 3]) {
        winner = boardSet[col][row];
        winType = 'diagonal';
        return [winner, winType];
      }
    }
  }
  if (winner > 0) return [winner, winType];

  // Check diagonal win (bottom-left to top-right)
  for (let col = 3; col < nbCol; col++) {
    for (let row = 0; row < nbRow - 3; row++) {
      if (boardSet[col][row] !== 0 && 
          boardSet[col][row] === boardSet[col - 1][row + 1] &&
          boardSet[col][row] === boardSet[col - 2][row + 2] &&
          boardSet[col][row] === boardSet[col - 3][row + 3]) {
        winner = boardSet[col][row];
        winType = 'diagonal';
        return [winner, winType];
      }
    }
  }

  return [winner, winType];
}

function playerTurn(boardSet: BoardSet) {
  let player1Count = 0;
  let player2Count = 0;
  const nbCol = boardSet.length;
  const nbRow = boardSet[0].length;
  for (let col = 0; col < nbCol; col++) {
    for (let row = nbRow-1; row >= 0; row--) {
      if (boardSet[col][row] === 0) continue;  // Skip empty columns
      if (boardSet[col][row] === 1) player1Count++;
      else if (boardSet[col][row] === 2) player2Count++;
    }
  }
  if (player1Count === player2Count) {
    return 1; // Player 1's turn
  } else if (player1Count === player2Count + 1) {
    return 2; // Player 2's turn
  } else {
    console.error("Invalid board state: player counts do not match.");
    return -1; // Invalid state
  }
}

export default App
