import React, { useEffect, useState } from "react";
import { Cell } from "./Cell";

interface Props {
  board: string[][];
  currentPosition: number[];
  onMove: (newPosition: number[]) => void;
  hidden?: string;
}

export const Grid = (props: Props) => {
  function handleKeyDown(event: any) {
    // TODO: Handle tab key
    switch (event.key) {
      case "ArrowLeft":
        props.onMove(moveLeft());
        break;
      case "ArrowRight":
        props.onMove(moveRight());
        break;
      case "ArrowUp":
        props.onMove(moveUp());
        break;
      case "ArrowDown":
        props.onMove(moveDown());
        break;
      default:
        console.log("Do nothing", event.key);
    }
  }

  const moveLeft = () => {
    const [i, j] = props.currentPosition;
    const newCol = j - 1 < 0 ? j : j - 1;
    return [i, newCol];
  };

  const moveRight = () => {
    const [i, j] = props.currentPosition;
    const newCol = j + 1 === props.board[i].length ? j : j + 1;
    return [i, newCol];
  };

  const moveUp = () => {
    const [i, j] = props.currentPosition;
    const newRow = i - 1 < 0 ? i : i - 1;
    return [newRow, j];
  };

  const moveDown = () => {
    const [i, j] = props.currentPosition;
    const newRow = i + 1 === props.board.length ? i : i + 1;
    return [newRow, j];
  };

  return (
    <div className="grid" onKeyDown={handleKeyDown}>
      {props.board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => {
            const isCurrentPosition =
              props.currentPosition[0] === i && props.currentPosition[1] === j;
            return (
              <Cell
                hidden={cell === props?.hidden}
                items={[cell]}
                key={i + "#" + j}
                isCurrentCell={isCurrentPosition}
              ></Cell>
            );
          })}
        </div>
      ))}
    </div>
  );
};
