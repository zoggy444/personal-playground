import './Components.css';
import { Stack } from '@fluentui/react/lib/Stack';

const levels: Record<number, number> = {
  2: 1,
  4: 2,
  8: 3, 
  16: 4,
  32: 5,
  64: 6,
  128: 7,
  256: 8,
  512: 9,
  1024: 10,
  2048: 11,
  4096: 12,
}

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
                backgroundColor: cell === 0 ? 'lightgray' : `hsl(${60 - ((levels[cell] - 1) * (60 / 11))}, 100%, ${80 - ((levels[cell] - 1) * (70 / 11))}%)`,
                color: levels[cell] <= 7 ? 'black' : 'white',
                display: 'flex',
                height: 50,
                justifyContent: 'center',
                width: 50,
                margin: 4,
              }}>
                {cell || ''}
              </span>
            </Stack>
          ))}
        </Stack>
      ))}
    </>
  );
}

export default Board;
