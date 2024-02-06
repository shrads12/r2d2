import React, { useEffect, useState } from "react";
import { changePlan, isToken } from "./util";
import { GameEnd } from "./GameEnd";
import { Grid } from "./Grid";
import { GameConfig } from "./types";

interface Props {
  board: string[][];
  gameConfig: GameConfig;
  restart?: () => void;
}

interface State {
  board: string[][];
  currentPosition: number[];
  won: boolean;
  tokens: string[];
  targets: string[];
}

export function Board({ board: zeroState, gameConfig, restart }: Props) {
  const [game, setGame] = useState<State>({
    board: null,
    currentPosition: [],
    won: false,
    tokens: [],
    targets: [],
  });
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer | number>();

  useEffect(() => {
    const startPosition = findPosition(zeroState);
    if (startPosition[1] === -1) {
      return null;
    }
    setGame((game) => ({
      ...game,
      board: zeroState,
      currentPosition: startPosition,
      won: null,
      tokens: [],
      targets: [],
    }));

    const interval = setInterval(changeBoard, 5000);
    setIntervalRef(interval);
    return () => clearInterval(interval);
  }, [zeroState]);

  function changeBoard() {
    setGame((game) => {
      const { board, currentPosition } = game;
      const newPlan = changePlan(board, currentPosition);
      return {
        ...game,
        board: newPlan,
        currentPosition: findPosition(newPlan),
      };
    });
  }

  function findPosition(board: string[][]) {
    return board.reduce(
      (position, row, i) => {
        const column = row.reduce((val, col, j) => {
          if (col === "player") {
            return j;
          }
          return val;
        }, -1);
        if (column !== -1) {
          return [i, column];
        }
        return position;
      },
      [-1, -1]
    );
  }

  function checkIfGameEnded() {
    const [i, j] = game.currentPosition;
    if (
      game.board[i][j] === "end" &&
      game.targets.length === gameConfig.targets
    ) {
      endGame(true);
    }
  }

  function endGame(didWin: boolean) {
    clearInterval(intervalRef);
    setGame((game) => ({ ...game, won: didWin }));
  }

  function cloneBoard(board: string[][]) {
    return board.reduce((acc, row) => {
      acc.push(row.map((cell) => cell));
      return acc;
    }, new Array());
  }

  function play() {
    const { currentPosition, board } = game;
    const [i, j] = currentPosition;
    const value = board[i][j];

    if (!isToken(value)) {
      return;
    }

    switch (value) {
      case "weapon": {
        setGame((game) => {
          const clone = cloneBoard(game.board);
          clone[i][j] = "0";
          return { ...game, tokens: [...game.tokens, value], board: clone };
        });
        break;
      }
      case "target": {
        setGame((game) => {
          if (game.tokens.includes("weapon")) {
            const clone = cloneBoard(game.board);
            clone[i][j] = "0";
            return { ...game, targets: [...game.targets, value], board: clone };
          } else return game;
        });
        break;
      }
      case "end":
        checkIfGameEnded();
        break;
    }
  }

  function updatePosition(newPosition: number[]) {
    let { board } = game;
    const [newRow, newCol] = newPosition;
    setGame((game) => ({ ...game, currentPosition: [newRow, newCol] }));
    if (board[newRow][newCol] === "obstacle") {
      endGame(false);
    }
  }

  if (!game.board) {
    return <div>Building board...</div>;
  }

  return (
    <div className="game-container">
      <Grid
        board={game.board}
        onMove={updatePosition}
        currentPosition={game.currentPosition}
        onEnter={play}
      ></Grid>
      <div className="object-container">
        {game.tokens.map((obj, i) => {
          return <div key={obj + i} className={`object ${obj}`}></div>;
        })}
        {game.targets.map((obj, i) => {
          return <div key={obj + i} className={`target ${obj}`}></div>;
        })}
      </div>
      {game.won != null && <GameEnd won={game.won} restart={restart}></GameEnd>}
    </div>
  );
}
