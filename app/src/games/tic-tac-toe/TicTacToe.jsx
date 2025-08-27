import './TicTacToe.scss'
import { useState } from 'react';


const DEFAULT_BOARD = [];
for (let i = 0; i < 9; i++) {
  DEFAULT_BOARD.push(null);
}

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]


const TicTacToe = () => {
  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [turn, setTurn] = useState(true) // true for O and false for X;
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(0)

  const handleClick = (id) => {
    if (board[id] === null && !winner) {
      const newboard = board.slice();
      newboard[id] = turn ? 'O' : 'X';
      setBoard(newboard);
      setTurn(prev => !prev);
      setStep(prev => prev + 1);

      checkWinner(newboard, step + 1);
    }
  }

  const handleResetClick = () => {
    setBoard(DEFAULT_BOARD)
    setTurn(true);
    setWinner(null);
    setStep(0)
  }

  const checkWinner = (newboard) => {
    for (let i = 0; i < winConditions.length; i++) {
      if (newboard[winConditions[i][0]] === newboard[winConditions[i][1]] && newboard[winConditions[i][1]] === newboard[winConditions[i][2]]) {
        setWinner(newboard[winConditions[i][0]])
        return
      }
    }
  }

  const renderMessage = () => {
    if (winner) {
      return `${winner} win!`
    } else if (!winner && step === 9) {
      return 'Draw!'
    }
    return `${turn ? 'O' : 'X'}'s turn`
  }

  

  return (
    <div className='tic-tac-toe-container'>
      <div>{renderMessage()}</div>
      <div className='board'>
        {board.map((cell, index) => (
          <div className='cell' onClick={() => handleClick(index)} key={`${cell}-${index}`}>{cell}</div>
        ))}
      </div>
      <button className='button' onClick={handleResetClick}>Reset</button>
    </div>
  )
}

export default TicTacToe;