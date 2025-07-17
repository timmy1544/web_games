import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WhackAMole from './games/whack_a_mole';
import MainPage from './games/MainPage';
import MemoryGame from './games/memory_game';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/WhackAMole" element={<WhackAMole />} />
        <Route path="/MemoryGame" element={<MemoryGame />} />
      </Routes>
    </Router>
  );
}

export default App;
