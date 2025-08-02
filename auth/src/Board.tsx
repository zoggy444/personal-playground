

function Board({boardSet}:{boardSet: number[][]}) {

  return (
    <div className="game-board-container">
      {boardSet.map((col, colIndex) => (
        <div key={colIndex} className="column">
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
