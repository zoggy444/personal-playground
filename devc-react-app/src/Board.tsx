import './Components.css';
import { Stack } from '@fluentui/react/lib/Stack';

function Board({boardSet}:{boardSet: number[][]}) {

  return (
    <>
      {boardSet.map((row, rowIndex) => (
        <Stack
          key={rowIndex}
          enableScopedSelectors
          horizontal
          disableShrink={true}
          verticalAlign='center'
          horizontalAlign='center'
        >
          {row.map((cell, cellIndex) => (
            <Stack
              key={cellIndex}
              enableScopedSelectors
              horizontalAlign='center'
              verticalAlign='center'
            >
              <span style={{
                alignItems: 'center',
                boxShadow: `0px 0px 10px 5px black`,
                backgroundColor: cell === 0 ? 'lightgray' : `hsl(${Math.min(120, cell * 10)}, 100%, 50%)`,
                color: 'white',
                display: 'flex',
                height: 50,
                justifyContent: 'center',
                width: 50,
                margin: 4,
              }}>
                {cell}
              </span>
            </Stack>
          ))}
        </Stack>
      ))}
    </>
  );
}

export default Board;
