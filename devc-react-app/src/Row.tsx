import Square from './Square.tsx';
import './Components.css';

function Row({ boardRow = [0, 0, 0, 0] }) {
  return (
    <tr className="row">
      <Square value={boardRow[0]} />
      <Square value={boardRow[1]} />
      <Square value={boardRow[2]} />
      <Square value={boardRow[3]} />
    </tr>
  );
}

export default Row;
