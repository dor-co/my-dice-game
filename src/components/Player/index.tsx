import "./style.scss";
import { IPlayer } from "../../common/types";

const Player: React.FC<IPlayer> = ({
  label,
  totalScore,
  currentScore,
  isActive,
}) => {
  return (
    <div className="game-player">
      <h2 className={isActive ? "active" : ""}>{label}</h2>
      <p>Total: {totalScore}</p>
      <p>Current Score: {currentScore}</p>
    </div>
  );
};

export default Player;
