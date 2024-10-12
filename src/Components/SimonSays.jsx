import React, { useState, useEffect } from "react";
import "./SimonSays.css";

export default function SimonSays() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [flash, setFlash] = useState(null);
  const [level, setLevel] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [highestScore, setHighestScore] = useState([]);

  const colours = ["red", "blue", "green", "yellow"];

  //Flash a button and reset after a short duration
  const flashButton = (colorId) => {
    setFlash(colorId);
    setTimeout(() => {
      setFlash(null);
    }, 500);
  };

  // Add a new color to the game seq and flash it
  const levelUp = () => {
    setUserSeq([]);
    setLevel((preLevel) => preLevel + 1);
    const randColor = colours[Math.floor(Math.random() * 4)];
    setGameSeq((prevSeq) => [...prevSeq, randColor]);
    setTimeout(() => flashButton(randColor), 1000);
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
    setGameEnd(false);
    setUserSeq([]);
    setGameSeq([]);
    setLevel(0);
    // setHighestScore([0]);
    levelUp();
  };

  const userClick = (index, colorId) => {
    if (!gameEnd) {
      flashButton(colorId);
      setUserSeq((prevSeq) => [...prevSeq, colours[index]]);
      console.log("color:", colorId, "userSeq is:", userSeq);
    }
  };

  useEffect(() => {
    if (userSeq.length > 0) {
      let correct = userSeq.every((color, idx) => color === gameSeq[idx]);
      if (correct) {
        if (userSeq.length === gameSeq.length) {
          levelUp();
        }
      } else {
        setHighestScore((prevScore) => [...prevScore, level]);
        setGameEnd(true);
        setGameStatus(false);
      }
    }
  }, [userSeq, gameSeq, level]);

  let HighestScore = Math.max(...highestScore);

  return (
    <div>
      <h1>Sonic Sequence</h1>
      {/* Show game over message only if the game has ended and was started */}
      {gameEnd ? ( // Game has ended and was started
        <span>
          <h2>Game Over... Your Score is {level}.</h2>
          <h3>Highest Score is {HighestScore}</h3>
        </span>
      ) : (
        <span></span>
      )}
      {/* Use null instead of an empty <span> */}
      {gameStatus ? (
        <span>
          <h2>Level: {level}</h2>
        </span>
      ) : (
        <>
          <button className="GameStart" onClick={StartGame}>
            Start Game
          </button>
          <br />
        </>
      )}
      <div className="row">
        <GameButton index={0} color="#d95980" colorId="red" />
        <GameButton index={1} color=" #819ff9" colorId="blue" />
      </div>
      <div className="row">
        <GameButton index={2} color="#63aac0" colorId="green" />
        <GameButton index={3} color="#f99b45" colorId="yellow" />
      </div>
    </div>
  );
}
