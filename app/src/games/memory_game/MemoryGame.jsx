import "./MemoryGame.scss";
import { useState, useEffect, useRef } from "react";

const emojis = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐴",
  "🦄",
  "🦓",
  "🦌",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐻",
  "🐨",
  "🐼",
  "🐽",
  "🐸",
  "🐰",
  "🐙",
];

const MemoryGame = () => {
  const [board, setBoard] = useState({});
  const [select, setSelect] = useState({
    first: null,
    second: null,
  });
  const [finish, setFinish] = useState({});
  const timeoutRef = useRef(null);

  // board generation
  useEffect(() => {
    setBoard(generateBoard());
  }, []);

  const generateBoard = () => {
    // get random 8 emojis
    const randomEmojis = emojis
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    // get 16 length of arr formed by 8 emojis (random sequence)
    const emojiArr = randomEmojis
      .concat(randomEmojis)
      .slice()
      .sort(() => Math.random() - 0.5);

    const board = {};
    emojiArr.map(
      (item, index) =>
        (board[index] = {
          value: item,
          index,
        }),
    );
    return board;
  };

  const handleCardClick = (item, index) => {
    // click the third card when the previous two cards still display, clear the timeout and hide them immediately
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setSelect({
        first: null,
        second: null,
      });
    }
    if (!select.first || (select.first && select.second)) {
      // first select
      setSelect({
        first: {
          value: item.value,
          index,
        },
        second: null,
      });
    } else if (!select.second) {
      // second select
      setSelect({
        ...select,
        second: {
          value: item.value,
          index,
        },
      });
    }
  };

  const boardRenderer = () => {
    const { first, second } = select;
    return Object.values(board).map((item, index) => {
      if (
        (first && first.index === index) ||
        (second && second.index === index) ||
        finish[index]
      ) {
        return (
          <div
            className={`card ${finish[index] ? "isFinish" : ""}`}
            key={index}
          >
            {item.value}
          </div>
        );
      } else {
        return (
          <div
            className="card"
            onClick={() => handleCardClick(item, index)}
            key={index}
          >
            {""}
          </div>
        );
      }
    });
  };

  const handlePlayAgainClick = () => {
    setBoard(generateBoard());
    setFinish({});
    setSelect({
      first: null,
      second: null,
    });
  };

  useEffect(() => {
    const { first, second } = select;
    if (first && second) {
      //check if the answer is correct
      if (first.value === second.value) {
        // correct answer -> set to finish and open permanently
        setFinish({
          ...finish,
          [first.index]: true,
          [second.index]: true,
        });
      } else {
        // wrong answer -> open the card for 1 sec and close them after
        timeoutRef.current = setTimeout(() => {
          setSelect({
            first: null,
            second: null,
          });
          timeoutRef.current = null;
        }, 1000);
      }
    }
  }, [select, finish]);

  const isComplete = Object.keys(finish).length === Object.keys(board).length;

  return (
    <div className="memory-game-container">
      <div className="board">{boardRenderer()}</div>
      {isComplete && (
        <div className="button">
          <button onClick={handlePlayAgainClick}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
