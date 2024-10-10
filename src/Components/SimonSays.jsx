import React, { useState, useEffect } from "react";
import "./SimonSays.css";
export default function SimonSays() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [flash, setFlash] = useState(null);
  const [level, setLevel] = useState(0);
  const colours = ["red", "blue", "green", "yellow"];

  const flashButton = (colorId) => {
    setFlash(colorId);
    setTimeout(() => {
      setFlash(null);
    }, 500);
  };

  const levelUp = () => {
    setUserSeq([]);
    setLevel((preLevel) => preLevel + 1);
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colours[randIdx];
    setGameSeq((prevSeq) => [...prevSeq, randColor]);

    setTimeout(() => {
      flashButton(randColor);
    }, 1000);
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
    setGameStatus(true);
    setGameSeq([]);
    setLevel(0);
    levelUp();
  };

  const userClick = (index, colorId) => {
    setFlash(colorId);
    setTimeout(() => {
      setFlash(null);
      setUserSeq((prevSeq) => [...prevSeq, colours[index]]);
    }, 500);

    console.log("color:", colorId, "userSeq is:", userSeq);
  };

  useEffect(
    () => {
      if (userSeq.length > 0) {
        let correct = userSeq.every((color, idx) => color === gameSeq[idx]);
        if (correct) {
          if (userSeq.length === gameSeq.length) {
            levelUp();
          }
        } else {
          alert(`Game Over!! : ) Your Score is :${level}`);
          setGameStatus(false);
        }
      }
    },
    [userSeq],
    [gameSeq]
  );

  return (
    <div>
      <h1>Simon Says</h1>
      {gameStatus ? (
        <span>
          <h2>Level: {level}</h2>
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
