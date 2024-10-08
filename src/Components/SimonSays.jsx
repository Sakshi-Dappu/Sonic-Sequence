import React, { useState } from "react";
import "./SimonSays.css";
export default function SimonSays() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [flash, setFlash] = useState(null);
  let colours = ["red", "blue", "green", "yellow"];

  const ClickButton = ({ index, color, Color_id }) => {
    return (
      <button
        className={`GameBtn ${flash === Color_id ? "flash" : ""}`}
        id={Color_id}
        onClick={() => userClick(index, Color_id)}
        on
        style={{
          backgroundColor: color,
        }}
      ></button>
    );
  };

  const StartGame = () => {
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colours[randIdx];
    // let level = 0;
    if (gameStatus == false) {
      //   level++;
      setGameStatus(true);

      setTimeout(() => {
        setFlash(randColor);
        ClickButton({ randIdx, randColor, randColor });
        console.log("Random Color", randColor);
      }, 1000);

      setTimeout(() => {
        setGameSeq((prevSeq) => [...prevSeq, randColor]);
        setFlash(null);
        console.log("Game Started", "GameSeq is => ", gameSeq);
      }, 1500);
    } else {
      console.log("Game is already started");
    }
  };

  const userClick = (index, Color_id) => {
    setFlash(Color_id);
    setTimeout(() => {
      setFlash(null);
    }, 500);
    setUserSeq((prevSeq) => [...prevSeq, index]);
    return console.log(
      "Button :",
      index,
      "color:",
      Color_id,
      "userSeq is:",
      userSeq
    );
  };

  return (
    <div>
      <h1>Simon Says</h1>
      {gameStatus ? (
        <span>
          <h2>Level is 1</h2>
        </span>
      ) : (
        <button className="GameStart" onClick={StartGame}>
          Start Game
        </button>
      )}

      <div className="row">
        <ClickButton index={0} color="red" Color_id="red" />
        <ClickButton index={1} color="blue" Color_id="blue" />
      </div>
      <div className="row">
        <ClickButton index={2} color="green" Color_id="green" />
        <ClickButton index={3} color="yellow" Color_id="yellow" />
      </div>
    </div>
  );
}
