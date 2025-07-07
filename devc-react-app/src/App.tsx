import { useState, useEffect } from 'react'
import './App.css'
import Board from "./Board.tsx"

const WINCONDITION = 256;

function App() {
  const [status, setStatus] = useState("playing");
  const [boardSet, setBoardSet] = useState([
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }); // No dependency array : run this every render

  const keyDownHandler = function (e) {
    // don't listen to keys after player looses
    // player can keep playing after winning to reach a higher score
    if (status != 'lost') {
      switch (e.key) {
        case 'ArrowRight':
          handleSlideRight();
          break;
        case 'ArrowLeft':
          handleSlideLeft();
          break;
        case 'ArrowDown':
          handleSlideDown();
          break;
        case 'ArrowUp':
          handleSlideUp();
          break;
      }
    }
  };

  /**
   * Slides all numbers horizontally to the right.
   * Merges squares with equal value that slide together.
   * Updates state if necessary.
   */
  const handleSlideRight = function () {
    let newBoardSet = boardSet.map(function (arr) {
      return arr.slice();
    });
    let hasSlided = false;
    for (let i=0; i<newBoardSet.length; i++) {
      newBoardSet[i] = slideLine(newBoardSet[i]);
      if (!areEquals(newBoardSet[i],boardSet[i])) hasSlided = true;
    }

    if (hasSlided) endTurn(newBoardSet);
  };

  /**
   * Slides all numbers horizontally to the left.
   * Merges squares with equal value that slide together.
   * Updates state if necessary.
   */
  const handleSlideLeft = function () {
    let newBoardSet = boardSet.map(function (arr) {
      return arr.slice();
    });
    let hasSlided = false;
    for (let i in newBoardSet) {
      newBoardSet[i] = slideLine(newBoardSet[i], true);
      if (!areEquals(newBoardSet[i],boardSet[i])) hasSlided = true;
    }

    if (hasSlided) endTurn(newBoardSet);
  };

  /**
   * Slides all numbers vertically to the top.
   * Merges squares with equal value that slide together.
   * Updates state if necessary.
   */
  const handleSlideUp = function () {
    let newBoardSet = boardSet.map(function (arr) {
      return arr.slice();
    });
    let hasSlided = false;
    for (let j = 0; j < 4; j++) {
      let newCol = slideLine(
        newBoardSet.map((r) => r[j]),
        true
      );
      for (let i = 0; i < 4; i++) {
        newBoardSet[i][j] = newCol[i];
        if (newBoardSet[i][j] != boardSet[i][j]) hasSlided = true;
      }
    }

    if (hasSlided) endTurn(newBoardSet);
  };

  /**
   * Slides all numbers vertically to the bottom.
   * Merges squares with equal value that slide together.
   * Updates state if necessary.
   */
  const handleSlideDown = function () {
    let newBoardSet = boardSet.map(function (arr) {
      return arr.slice();
    });
    let hasSlided = false;
    for (let j = 0; j < 4; j++) {
      let newCol = slideLine(newBoardSet.map((r) => r[j]));
      for (let i = 0; i < 4; i++) {
        newBoardSet[i][j] = newCol[i];
        if (newBoardSet[i][j] != boardSet[i][j]) hasSlided = true;
      }
    }

    if (hasSlided) endTurn(newBoardSet);
  };

  const endTurn = function (newBoardSet) {
    const maxValue = Math.max(...[].concat(...newBoardSet));
    if (status != 'won' && maxValue >= WINCONDITION) setStatus('won');
    // a wild number appears...
    const numberAdded = addNewNumber(newBoardSet);
    // player looses if board can't be slided and they haven't already won
    if (!canSlideAny(newBoardSet) && status != "won") setStatus('lost');
    setBoardSet(newBoardSet);
  };

  const handleNewGame= function () {
    setStatus("playing");
    setBoardSet([
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  }

  /* JSX */
  return (
    <>
      <Board boardSet={boardSet}/>
      {status == 'won' && <div>GAGNÉ!!!</div>}
      {status == 'lost' && <div>PERDU</div>}
      <button name="restart" onClick={handleNewGame}>NEW GAME</button>
    </>
  );
}

/**
 * Checks if at least one line can be slided.
 */
function canSlideAny(m){
  if (canSlide(m,true,true)) return true;
  if (canSlide(m,true,false)) return true;
  if (canSlide(m,false,true)) return true;
  if (canSlide(m,false,false)) return true;
  return false;
}

/**
 * Checks if at least one line can be slided.
 */
function canSlide(m, horizontally=true, reverse=false) {
  if (horizontally) {
    for (let i=0; i<m.length; i++) {
      if (canSlideLine(m[i], reverse)) {
        console.log("can slide !",horizontally,reverse,i);
        return true;
      }
    }
  }else{
    for (let i=0; i<m[0].length; i++) {
      if (canSlideLine(m.map(r=>r[i]), reverse)) {
        console.log("can slide !",horizontally,reverse,i);
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if this line can be slided.
 */
function canSlideLine(line, reverse = false) {
  if (isZero(line)) return false;
  let l = reverse ? line.slice().reverse() : line.slice();
  // check if all numbers are already slided
  while (l[0] == 0) {
    l = l.slice(1)
  }
  // they are not, line can be slided !
  if (!isFull(l)) {
    console.log("can slide for space", l);
    return true
  }
  // tail is full, check if their are equal numbers
  let i = 1;
  while (i < l.length) {
    // two numbers equals, can be merged !
    if (l[i] == l[i-1]){
    console.log("can slide for merge", l);
    return true
  }
  }
  return false;
}

/**
 * Does the actual sliding of numbers in an array. Recursive.
 */
function slideLine(line, reverse = false) {
  // pulls all numbers to the right
  function pull(l) {
    if (l.length == 1) return l;
    let iEnd = l.length - 1;
    let head = l.slice(0, iEnd);
    let tail = l[iEnd];
    if (tail == 0) {
      let iCurr = head.length - 1;
      // place the first number that is not 0 at the end
      while (iCurr > 0 && head[iCurr] == 0) {
        iCurr--;
      }
      tail = head[iCurr];
      head[iCurr] = 0;
    }
    return pull(head).concat([tail]);
  }
  // merges equal numbers
  function merge(l) {
    let iEnd = l.length - 1;
    while (iEnd >= 1) {
      if (l[iEnd] == l[iEnd - 1]) {
        l[iEnd] = l[iEnd] * 2;
        l[iEnd - 1] = 0;
        iEnd--;
      }
      iEnd--;
    }
  }

  let l = line.slice();
  // nothing to slide
  if (isZero(l)) return l;
  reverse && l.reverse();
  // pull once, merge, pull again (merging creates space)
  l = pull(l);
  merge(l);
  l = pull(l);

  reverse && l.reverse();
  return l;
}

/**
 * Replaces a zero with either a 2 or a 4 in a matrix
 * @returns true if a number is added, false if there is no room
 */
function addNewNumber(values) {
  let coords = getNextCoords(values);
  if (!coords) return false;
  let newNumber = Math.random() > 0.5 ? 4 : 2;
  values[coords[0]][coords[1]] = newNumber;
  return true;
}

/**
 * Finds the coordinates for the next number to appear
 * @returns coordinates or undefined if there is no room
 */
function getNextCoords(values) {
  const nbSlots = values
    .map((r) => r.reduce((total, x) => (x == 0 ? total + 1 : total), 0))
    .reduce((total, x) => total + x, 0);

  if (nbSlots == 0) return undefined;

  const position = Math.floor(Math.random() * nbSlots);
  let count = 0;
  let coords = [0, 0];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (values[i][j] == 0) {
        if (count == position) {
          coords = [i, j];
        }
        count++;
      }
    }
  }
  return coords;
}

/**
 * checks if at least one cell is not 0
 */
function isZero(a) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] != 0) return false;
  }
  return true;
}

/**
 * Checks if at least one cell is 0
 */
function isFull(a) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == 0) return false;
  }
  return true;
}

/**
 * Check for equality.
 * We assume both arrays are of same length.
 */
function areEquals(a1, a2) {
  for (let i=0; i<a1.length; i++) {
    if (a1[i] != a2[i]) return false;
  }
  return true;
}

export default App
