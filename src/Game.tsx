import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { setupBoard } from "./util";

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

  return board && <Board board={board} gameConfig={config} restart={restart} />;
}
