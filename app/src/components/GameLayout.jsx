import { useNavigate, useLocation } from "react-router-dom";
import './GameLayout.scss';

const GameLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the return button on the main page
  const showReturnButton = location.pathname !== "/";

  return (
    <div className="game-layout">
      {showReturnButton && (
        <button 
          className="game-layout__return-button" 
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      )}
      <div className="game-layout__content">
        {children}
      </div>
    </div>
  );
};

export default GameLayout; 