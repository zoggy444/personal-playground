import { useState } from "react";

function Board({boardSet}:{boardSet: number[][]}) {
  const [highlighted, setHighlighted] = useState(-1)

  return (
    <div className="game-board-container">
      {boardSet.map((col, colIndex) => (
        <div 
        key={colIndex}
        className={ colIndex === highlighted ? "column highlighted" : "column"}
        onMouseOver={() => setHighlighted(colIndex)}>
          {col.map((cell, cellIndex) => (
            <div key={cellIndex} className={`slot ${cell === 0 ? 'empty' : ''}`}>
              {cell !== 0 && <span className={`player-${cell}`}>{cell}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
