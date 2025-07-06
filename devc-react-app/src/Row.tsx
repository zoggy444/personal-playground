import Square from './Square.tsx';
import './Components.css';

function Row({ values = [0, 0, 0, 0] }) {
  return (
    <tr className="row">
      <Square value={values[0]} />
      <Square value={values[1]} />
      <Square value={values[2]} />
      <Square value={values[3]} />
    </tr>
  );
}

export default Row;
