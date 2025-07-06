import './Components.css';

function Square({ value }) {
  return <td className="square">{value != 0 && value}</td>;
}

export default Square;
