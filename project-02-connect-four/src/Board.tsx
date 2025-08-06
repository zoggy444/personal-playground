import { useState } from "react";

function Board({boardSet, onClick}:
    {boardSet: number[][]; onClick: (colIndex: number) => void}) {
  const [highlighted, setHighlighted] = useState(-1)

  return (
    <div className="game-board-container">
      {boardSet.map((col, colIndex) => (
        <div 
        key={colIndex}
        className={ colIndex === highlighted ? "column highlighted" : "column"}
        onMouseOver={() => setHighlighted(colIndex)}
        onClick={() => onClick(colIndex)}>
          {col.map((cell, cellIndex) => (
            <div key={cellIndex} className={`slot ${cell === 0 ? 'empty' : `fill player-${cell}`}`}>
              {cell !== 0 && <span className={`fill player-${cell}`}></span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
