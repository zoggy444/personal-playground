import './App.css'
import Board from './Board'
import { useState } from 'react'

type BoardSet = number[][];
type PreconfProps = {
  preconfBoardSet?: BoardSet;
  preconfPlayer?: number;
}
type WinType = 'horizontal' | 'vertical' | 'diagonal' | undefined;

function App({preconfBoardSet, preconfPlayer} : PreconfProps) {
  // 7 columns with 6 rows each, initialized to 0
  const initialBoardSet:BoardSet = preconfBoardSet || Array.from({ length: 7 }, () => Array(6).fill(0)) as BoardSet;
  const [boardSet, setBoardSet] = useState<BoardSet>(initialBoardSet);
  const [player, setPlayer] = useState(preconfPlayer || 1); // Player 1 starts

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
        <h2>Player {winner} wins with a {winType} win!</h2>
        : 
        <h2>Player {player}'s turn</h2>
      }
    </>
  )
}

const checkWinCondition = function (boardSet: BoardSet): [number, WinType] {
  const nbCol = boardSet.length;
  const nbRow = boardSet[0].length;
  const longest: {[index: number]:number} = {
    1: 0,
    2: 0
  };
  let winner = 0;
  let winType: WinType;

  // Check horizontal win
  for (let row = nbRow; row >=0 ; row--) {
    longest[1] = 0; // Reset longest for player 1
    longest[2] = 0; // Reset longest for player 2
    for (let col = 0; col < nbCol; col++) {
      if (boardSet[col][row] === 1) {
        longest[1]++;
        longest[2] = 0;
      } else if (boardSet[col][row] === 2) {
        longest[1] = 0;
        longest[2]++;
      } else {
        longest[1] = 0;
        longest[2] = 0;
      }
      console.log(`row: ${row} col: ${col} longest[1]: ${longest[1]}, longest[2]: ${longest[2]}`);
      if (longest[1] === 4) {
        winner = 1;
        break;
      } else if (longest[2] === 4) {
        winner = 2;
        break;
      }
    }
    if (winner > 0) {
      console.log(`Winner found: Player ${winner} with a horizontal win on row ${row}`);
      winType = 'horizontal';
      break; // Exit if a winner is found
    }
  }
  if (winner > 0) return [winner, winType];

  // Check vertical win
  for (let col = 0; col < nbCol; col++) {
    if (boardSet[col][nbRow-1] !== 0) { // Column is not empty
      longest[1] = 0; // Reset longest for player 1
      longest[2] = 0; // Reset longest for player 2
      for (let row = nbRow-1; row >= 0 ; row--) {
        if (col === 5) { // Special case for column 5
          console.log(`row: ${row} longest[1]: ${longest[1]}, longest[2]: ${longest[2]}`);
        }
        if (boardSet[col][row] === 1) {
          longest[1]++;
          longest[2] = 0;
        } else if (boardSet[col][row] === 2) {
          longest[1] = 0;
          longest[2]++;
        } else {
          break; // No more coins in this column
        }
        if (longest[1] === 4) {
          winner = 1;
          break;
        } else if (longest[2] === 4) {
          winner = 2;
          break;
        }
      }
    }
    if (winner > 0) {
      winType = 'vertical';
      break; // Exit if a winner is found
    }
  }
  if (winner > 0) return [winner, winType];

  // Check diagonal win (bottom-right to top-left)
  for (let col = 0; col < nbCol - 3; col++) {
    for (let row = 3; row < nbRow; row++) {
      if (boardSet[col][row] !== 0 && 
          boardSet[col][row] === boardSet[col + 1][row - 1] &&
          boardSet[col][row] === boardSet[col + 2][row - 2] &&
          boardSet[col][row] === boardSet[col + 3][row - 3]) {
        winner = boardSet[col][row];
        winType = 'diagonal';
        console.log(`Winner found: Player ${winner} with a diagonal win from bottom-right to top-left`);
        return [winner, winType];
      }
    }
  }

  return [winner, winType];
}

export default App
