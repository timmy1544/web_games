import "./TicTacToe.scss";
import { useState, useEffect } from "react";

const defaultBoard = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

const winRule = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const TicTacToe = () => {
  const [board, setBoard] = useState(defaultBoard);
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(0);

  const handleGridClick = (grid) => {
    if (board[grid] !== null || winner) {
      return;
    }
    setBoard({
      ...board,
      [grid]: turn,
    });
    setTurn((prev) => !prev);
    setStep((prev) => prev + 1);
  };

  const handleResetClick = () => {
    setBoard(defaultBoard);
    setTurn(true);
    setWinner(null);
    setStep(0);
  };

  const getMark = (item) => {
    if (board[item] === null) {
      return "";
    } else if (board[item]) {
      return "O";
    } else {
      return "X";
    }
  };
  const boardRenderer = () => {
    return Object.keys(board).map((item, index) => (
      <div
        className={"cell"}
        onClick={() => handleGridClick(index + 1)}
        key={index}
      >
        {getMark(item)}
      </div>
    ));
  };

  const getMessage = () => {
    if (winner !== null) {
      return `Player ${winner ? "O" : "X"} wins!`;
    } else if (step === 9) {
      return "Draw!";
    } else {
      return `Player ${turn ? "O" : "X"}'s turn`;
    }
  };

  // Check winner when board updates
  const checkWin = (board) => {
    for (let rule of winRule) {
      const [a, b, c] = rule;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // true (O) or false (X)
      }
    }
    return null;
  };
  useEffect(() => {
    const result = checkWin(board);
    if (result !== null) setWinner(result);
  }, [board]);

  return (
    <div className={"tic-tac-toe-container"}>
      <div className={"message"}>{getMessage()}</div>
      <div className={"board"}>{boardRenderer()}</div>
      <button className={"button"} onClick={handleResetClick}>
        {"Reset"}
      </button>
    </div>
  );
};

export default TicTacToe;
