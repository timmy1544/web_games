import './WhackAMole.css'
import { useState, useEffect } from "react";

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [showMoles, setShowMoles] = useState({});

  const getRandomMoles = () => {
    const num = [Math.ceil(Math.random() * 3)];
    const result = [];
    let i = 0;
    while (i < num) {
      const index = Math.floor(Math.random() * 9);
      if (result.includes(index)) {
        continue;
      } else {
        result.push(index);
        i++;
      }
    }
    return result;
  };

  useEffect(() => {
    if (time <= 0) {
      // game has ended, show the result and play again button
      setIsEnd(true);
      setIsStart(false);
    }
  }, [time]);

  useEffect(() => {
    if (!isStart || isEnd) {
      return;
    }
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isStart, isEnd]);

  useEffect(() => {
    if (!isStart || isEnd) {
      return;
    }
    const popMole = () => {
      const activeMoles = getRandomMoles();
      const newShowMoles = {};
      activeMoles.map((mole) => {
        newShowMoles[mole] = true;
      });
      setShowMoles(newShowMoles);
      setTimeout(() => {
        setShowMoles({});
      }, 1500);
    };

    const intervalId = setInterval(() => {
      popMole();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isStart, isEnd]);

  const hill = (
    <img
      src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
      className="hill-img"
    />
  );

  const mole = (index) => (
    <img
      src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
      className={`mole-img`}
      onClick={() => handleMoleClick(index)}
    />
  );

  const hillRenderer = () => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(
        <div className="grid" key={i}>
          {showMoles[i] ? mole(i) : null}
          {hill}
        </div>,
      );
    }
    return arr;
  };

  const handleBtnClick = () => {
    if (!isStart && !isEnd) {
      setIsStart(true);
    } else {
      setIsStart(true);
      setIsEnd(false);
      setScore(0);
      setTime(15);
    }
  };

  const handleMoleClick = (index) => {
    setScore((prev) => prev + 1);
    setShowMoles({
      ...showMoles,
      [index]: false,
    });
  };

  const headerRenderer = () => {
    if (!isStart && !isEnd) {
      return (
        <div className="header-btn">
          <button onClick={handleBtnClick}>Start</button>
        </div>
      );
    } else if (isEnd) {
      return (
        <div className="header-score">
          <div>{`Score: ${score}`}</div>
          <button onClick={handleBtnClick}>Play Again</button>
          <div>{`Time Left: ${time}`}</div>
        </div>
      );
    }
    return (
      <div className="header-score">
        <div>{`Score: ${score}`}</div>
        <div>{`Time Left: ${time}`}</div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">{headerRenderer()}</div>
      <div className="hills">{hillRenderer()}</div>
    </div>
  );
}

export default WhackAMole;
