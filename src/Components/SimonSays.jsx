import React from "react";
import "./SimonSays.css";
export default function SimonSays() {
  let GameStatus = false;
  function ClickButton({ index, color }) {
    return (
      <button
        className="GameBtn"
        onClick={() => userClick(index, color)}
        style={{ backgroundColor: color }}
      ></button>
    );
  }
  let gameSeq = [];
  let userSeq = [];
  function StartGame() {
    if (GameStatus == false) {
      GameStatus = true;
      console.log("Game Started", "GameSeq is => ", gameSeq);
      setTimeout(() => {
        let randIdx = Math.floor(Math.random() * 4);
        console.log(randIdx);
        gameSeq.push(randIdx);
      }, 1000);
    } else {
      console.log("Game is already started");
    }
  }

    // function GameFlash() {
    //   let randIdx = Math.floor(Math.random() * 4);
    //   console.log(randIdx);
    // }

  const userClick = (index, color) => {
    userSeq.push(index);
    return console.log("Button :", index, "color:", color, "userSeq is:", userSeq);
  };

  return (
    <div>
      <h1>Simon Says</h1>
      <button className="GameStart" onClick={StartGame}>
        Start Game
      </button>
      <div className="row">
        <ClickButton index={0} color="rgb(163, 61, 107)" />
        <ClickButton index={1} color=" rgb(92, 109, 204)" />
      </div>
      <div className="row">
        <ClickButton index={2} color="rgb(64, 149, 98)" />
        <ClickButton index={3} color="rgb(114, 136, 58)" />
      </div>
    </div>
  );
}
