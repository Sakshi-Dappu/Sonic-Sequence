import React, { useState, useEffect } from "react";
import "./SimonSays.css";
export default function SimonSays() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [flash, setFlash] = useState(null);
  let colours = ["red", "blue", "green", "yellow"];

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = colours[randIdx];

  const flashButton = (colorId) => {
    setFlash(colorId);
    setTimeout(() => {
      setFlash(null);
    }, 500);
  };

  const levelUp = () => {
    let level = 0;
    level = level + 1;
  };

  const GameButton = ({ index, color, colorId }) => {
    return (
      <button
        className={`GameBtn ${flash === colorId ? "flash" : ""}`}
        id={colorId}
        onClick={() => userClick(index, colorId)}
        style={{
          backgroundColor: color,
        }}
      ></button>
    );
  };

  const StartGame = () => {
    if (gameStatus === false) {
      setGameStatus(true);

      setTimeout(() => {
        setFlash(randColor);
        GameButton({ randIdx, randColor, randColor });
        console.log("Random Color", randColor);
      }, 1000);

      setTimeout(() => {
        setGameSeq((prevSeq) => [...prevSeq, randColor]);
        setFlash(null);
        // console.log("Game Started", "GameSeq is => ", gameSeq);
      }, 1500);
    } else {
      console.log("Game is already started");
    }
  };

  const userClick = (index, colorId) => {
    setFlash(colorId);
    setTimeout(() => {
      setFlash(null);
      setUserSeq((prevSeq) => [...prevSeq, colours[index]]);
    }, 500);

    return console.log("color:", colorId, "userSeq is:", userSeq);
  };

  useEffect(() => {
    if (userSeq.length === gameSeq.length && userSeq.length != 0) {
      console.log("Promoted to next step");
      let randIdx = Math.floor(Math.random() * 4);
      let randColor = colours[randIdx];
      flashButton(randColor);
      levelUp();
    } else {
      console.log("Wrong Sequence");
    }
  }, [gameSeq, userSeq]);

  return (
    <div>
      <h1>Simon Says</h1>
      {gameStatus ? (
        <span>
          <h2>Level is`${levelUp}`</h2>
        </span>
      ) : (
        <button className="GameStart" onClick={StartGame}>
          Start Game
        </button>
      )}

      <div className="row">
        <GameButton index={0} color="red" colorId="red" />
        <GameButton index={1} color="blue" colorId="blue" />
      </div>
      <div className="row">
        <GameButton index={2} color="green" colorId="green" />
        <GameButton index={3} color="yellow" colorId="yellow" />
      </div>
    </div>
  );
}
