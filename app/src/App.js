import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameLayout from "./components/GameLayout";
import WhackAMole from "./games/whack_a_mole";
import MainPage from "./games/MainPage";
import MemoryGame from "./games/memory_game";
import TicTacToe from "./games/tic-tac-toe";
import Snake from "./games/snake";
import FileExplorer from './games/file_explorer'

const App = () => {
  return (
    <Router>
      <GameLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/WhackAMole" element={<WhackAMole />} />
          <Route path="/MemoryGame" element={<MemoryGame />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="/Snake" element={<Snake />} />
          <Route path='/FileExplorer' element={<FileExplorer />}/>
        </Routes>
      </GameLayout>
    </Router>
  );
};

export default App;
