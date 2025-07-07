import Row from './Row.tsx';
import './Components.css';

function Board({boardSet}) {

  return (
    <table>
      <tbody>
        <Row boardRow={boardSet[0]} />
        <Row boardRow={boardSet[1]} />
        <Row boardRow={boardSet[2]} />
        <Row boardRow={boardSet[3]} />
      </tbody>
    </table>
  );
}

export default Board;
