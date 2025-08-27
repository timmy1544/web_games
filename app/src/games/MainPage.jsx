import "./MainPage.scss";
import { useNavigate } from "react-router-dom";

const DEFAULT_CLASSNAME = "main-page";

const GAME_LIST = [
  {
    name: "Whack A Mole",
    path: "/WhackAMole",
  },
  {
    name: "Memory Game",
    path: "/MemoryGame",
  },
  {
    name: "Tic Tac Toe",
    path: "/TicTacToe",
  },
  {
    name: "Snake",
    path: "/Snake",
  },
  {
    name: "File Explorer",
    path: "/FileExplorer",
  },
  {
    name: "Traffic Light",
    path: "/TrafficLight",
  },
  {
    name: "Debounce & Throttle",
    path: "/DebounceThrottle",
  }
];

// Color palette for buttons
const COLOR_PALETTE = [
  "#A23C26",
  "#E2552D",
  "#748C69",
  "#FF9687",
  "#9EB4D3",
  "#BCAFCF",
  "#515B87",
  "#FDD878",
];

const MainPage = () => {
  const navigate = useNavigate();

  const gameListRenderer = () => {
    return GAME_LIST.map((game, index) => (
      <button
        className={`${DEFAULT_CLASSNAME}__button`}
        onClick={() => navigate(game.path)}
        style={{
          backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length],
        }}
        key={index}
      >
        {game.name}
      </button>
    ));
  };

  return (
    <div className={DEFAULT_CLASSNAME}>
      <h1 className={`${DEFAULT_CLASSNAME}-title`}>UI Components Practices</h1>
      <div className={`${DEFAULT_CLASSNAME}__button-container`}>
        {gameListRenderer()}
      </div>
    </div>
  );
};

export default MainPage;
