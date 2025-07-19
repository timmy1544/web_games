import React, { useState, useEffect, useCallback } from 'react';
import './Snake.scss';

const DEFAULT_CLASSNAME = 'snake';

const GRID_SIZE = 10;

const SNAKE = '🐲';
const FOOD = '🍎';

const Snake = () => {
    const [snakeHead, setSnakeHead] = useState({ x: 5, y: 5 });
    const [foodPosition, setFoodPosition] = useState({});
    const [score, setScore] = useState(0);


    const getRandomPosition = useCallback(() => {
        return Math.floor(Math.random() * GRID_SIZE);
    }, []);

    const putNewFood = useCallback(() => {
        let x = getRandomPosition();
        let y = getRandomPosition();

        while (snakeHead.x === x && snakeHead.y === y) {
            x = getRandomPosition();
            y = getRandomPosition();
        }
        return {
            x,
            y
        }
    }, [snakeHead, getRandomPosition]);

    const gridRenderer = () => {
      return (
        <div className={`${DEFAULT_CLASSNAME}__grid`}>
          {Array.from({ length: GRID_SIZE*GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeHead = x === snakeHead.x && y === snakeHead.y;
            const isFood = x === foodPosition.x && y === foodPosition.y;
            const hasEmoji = isSnakeHead || isFood;

            return (
              <div key={index} className={`${DEFAULT_CLASSNAME}__grid-cell ${hasEmoji ? 'emoji' : ''}`}>
                {isSnakeHead && SNAKE}
                {isFood && FOOD}
              </div>
            );
          })}
        </div>
      );
    };

    const checkEatenFood = useCallback((xSnake, ySnake) => {
        if (xSnake === foodPosition.x && ySnake === foodPosition.y) {
            setScore(prevScore => prevScore + 1);
            setFoodPosition(putNewFood());
        }
    }, [foodPosition, putNewFood]);

        const handleSnakeMove = useCallback((e) => {
        const { key } = e;
        
        // Prevent default behavior for arrow keys to stop page scrolling
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
        }
        
        let x = snakeHead.x;
        let y = snakeHead.y;
        let isMove = false;
        
        if (key === 'ArrowUp' && y > 0) {
            y -= 1;
            isMove = true;
        } else if (key === 'ArrowDown' && y < GRID_SIZE - 1) {
            y += 1;
            isMove = true;
        } else if (key === 'ArrowLeft' && x > 0) {
            x -= 1;
            isMove = true;
        } else if (key === 'ArrowRight' && x < GRID_SIZE - 1) {
            x += 1;
            isMove = true;
        }
        if (isMove) {
            setSnakeHead({ x, y });
            checkEatenFood(x, y);
        }
    }, [snakeHead, checkEatenFood]);

    const handleResetClick = () => {
        setSnakeHead({ x: 5, y: 5 });
        setScore(0);
        setFoodPosition(putNewFood());
    }

    useEffect(() => {
        setFoodPosition(putNewFood());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleSnakeMove);
        return () => window.removeEventListener('keydown', handleSnakeMove);
    }, [handleSnakeMove]);



  return (<div className={DEFAULT_CLASSNAME}>
      {gridRenderer()}
      <div className={`${DEFAULT_CLASSNAME}__score`}>Score: {score}</div>
      <button className={`${DEFAULT_CLASSNAME}__reset-button`} onClick={handleResetClick}>Reset</button>
  </div>);
};

export default Snake;