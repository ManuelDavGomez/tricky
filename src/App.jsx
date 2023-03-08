import React, { useState } from "react";
import "../src/App.css";

const App = () => {
  // funcion del cuadrado
  function Square({ onClick, value }) {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }

  // tablero del juego
  function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [isX, setIsX] = useState(true);

    const handleClick = (i) => {
      if (Winner(squares) || squares[i]) {
        return;
      }
      squares[i] = isX ? "X" : "O";
      setSquares(squares);
      setIsX(!isX);
    };

    const winner = Winner(squares);

    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = "Next Player: " + (isX ? "X" : "O");
    }

    const handleRestart = () => {
      setIsX(true);
      setSquares(Array(9).fill(null));
    };

    const renderSquare = (i) => {
      return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    };

    return (
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <p className="status">{status}</p>
        <button className="restart" onClick={handleRestart}>
          Restart Game!
        </button>
      </div>
    );
  }

  function Winner(squares) {
    const linesWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < linesWin.length; i++) {
      const [a, b, c] = linesWin[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return <Board />;
};

export default App;
