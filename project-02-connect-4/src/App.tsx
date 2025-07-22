import './App.css'
import Board from './Board'
//import { useState } from 'react'

// Define types for the board structure
type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
type column = Tuple<number, 6>;
type BoardSet = Tuple<column, 7>;

function App() {
  // 7 columns with 6 rows each, initialized to 0
  const boardSet:BoardSet = Array.from({ length: 7 }, () => Array(6).fill(0)) as BoardSet;

  return (
    <>
      <h1>Connect 4</h1>
      <Board boardSet={boardSet}/>
      <h2>Player 1's turn</h2>
    </>
  )
}

export default App
