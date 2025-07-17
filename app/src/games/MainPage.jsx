// MainPage.jsx
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Web Games Practices</h1>
      <button onClick={() => navigate("/WhackAMole")}>Whack A Mole</button>
      <button onClick={() => navigate("/MemoryGame")}>Memory Game</button>
    </div>
  );
}