import React, { useEffect, useState } from "react";
import { Background } from "../background/Background";
import { Board } from "./Board";
import { setupBoard } from "../util";
import { Instructions } from "./instructions/Instructions";

export function Game() {
  const [board, setBoard] = useState<string[][]>();
  const config = {
    targets: 5,
    obstacles: 15,
    rows: 10,
    columns: 10,
  };

  useEffect(() => {
    createBoard();
  }, []);

  function createBoard() {
    const board = setupBoard(config);
    setBoard(board);
  }

  function restart() {
    createBoard();
  }

  return (
    <div className="main">
      <Background />
      <h1>Jedi Quest!</h1>
      <h2>
        Embark on a space adventure, collect the lightsaber, and capture Vaders
        to win! <br />
        May the Force be with you!
      </h2>
      <Instructions />
      {board && <Board board={board} gameConfig={config} restart={restart} />}
    </div>
  );
}
