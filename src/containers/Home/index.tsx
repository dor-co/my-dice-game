import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dice from "../../components/Dice";
import Player from "../../components/Player";
import { IDiceState, IPlayerState, ITogglePlayer } from "../../common/types";
import "./style.scss";
import Input from "../../components/Input";

const Home: React.FC = () => {
  const [dices, setDices] = useState<IDiceState>({
    dice1: null,
    dice2: null,
  });
  const [winScore, setWinScore] = useState<number>(100);
  const [togglePlayer, setTogglePlayer] = useState<ITogglePlayer>(1);
  const [players, setPlayers] = useState<{ 1: IPlayerState; 2: IPlayerState }>({
    1: { totalScore: 0, currentScore: 0 },
    2: { totalScore: 0, currentScore: 0 },
  });
  const [playerWins, setPlayerWins] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const storedWins = JSON.parse(localStorage.getItem("playerWins") || "{}");
    setPlayerWins(storedWins);
  }, []);

  const onRoll = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dicesResult = dice1 + dice2;

    setDices({ dice1, dice2 });

    if (dicesResult === 12) {
      alert("It's a double six! Next player turn");
      setDices({ dice1: null, dice2: null });
      onSwitchPlayer();
    } else {
      setPlayers((prev) => ({
        ...prev,
        [togglePlayer]: {
          ...prev[togglePlayer],
          currentScore: prev[togglePlayer].currentScore + dicesResult,
        },
      }));

      if (
        players[togglePlayer].totalScore +
          players[togglePlayer].currentScore +
          dicesResult >=
        winScore
      ) {
        updatePlayerWins(togglePlayer);
        alert(`Player ${togglePlayer} wins!`);
        resetGame();
      }
    }
  };

  const updatePlayerWins = (player: number) => {
    setPlayerWins((prevWins) => {
      const updatedWins = {
        ...prevWins,
        [player]: (prevWins[player] || 0) + 1,
      };
      localStorage.setItem("playerWins", JSON.stringify(updatedWins));
      return updatedWins;
    });
  };

  const onHold = () => {
    setPlayers((prev) => ({
      ...prev,
      [togglePlayer]: {
        totalScore:
          prev[togglePlayer].totalScore + prev[togglePlayer].currentScore,
        currentScore: 0,
      },
    }));
    setDices({ dice1: null, dice2: null });
    onSwitchPlayer();
  };

  const onSwitchPlayer = () => {
    setTogglePlayer((prev) => (prev === 1 ? 2 : 1));
    setPlayers((prev) => ({
      ...prev,
      [togglePlayer]: { ...prev[togglePlayer], currentScore: 0 },
    }));
  };

  const onWinScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinScore(parseInt(e.target.value));
  };

  const resetGame = () => {
    setDices({ dice1: null, dice2: null });
    setTogglePlayer(1);
    setPlayers({
      1: { totalScore: 0, currentScore: 0 },
      2: { totalScore: 0, currentScore: 0 },
    });
    setWinScore(100);
  };

  return (
    <div className="home-container">
      <h1 className="game-title">DICE GAME</h1>
      <div>
        <h2>Players Wins:</h2>
        <p>Player 1: {playerWins[1] || 0} wins</p>
        <p>Player 2: {playerWins[2] || 0} wins</p>
      </div>
      <div className="new-game-container">
        <Button onClick={resetGame} label={"+ NEW GAME"} />
      </div>

      <div className="dices-container">
        <Dice score={dices.dice1} />
        <br />
        <Dice score={dices.dice2} />
      </div>

      <div className="players-container">
        <Player
          label="Player 1"
          totalScore={players[1].totalScore}
          currentScore={players[1].currentScore}
          isActive={togglePlayer === 1}
        />
        <Player
          label="Player 2"
          totalScore={players[2].totalScore}
          currentScore={players[2].currentScore}
          isActive={togglePlayer === 2}
        />
      </div>
      <div className="actions-container">
        <Button onClick={onHold} label={"HOLD"} />
        <Button onClick={onRoll} label={"ROLL"} />
        <br />
        <span>ENTER GAME SCORE: </span>
        <Input
          type="number"
          placeholder="score to win"
          value={winScore}
          onChange={onWinScore}
        />
      </div>
    </div>
  );
};

export default Home;
