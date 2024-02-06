import { GameConfig } from "./types";

function findEmptyCell(
  plan: string[][],
  numRows: number,
  numCols: number
): number[] {
  const randRow = Math.floor(Math.random() * numRows);
  const randCol = Math.floor(Math.random() * numCols);
  if (plan[randRow][randCol] === "0") {
    return [randRow, randCol];
  } else {
    return findEmptyCell(plan, numRows, numCols);
  }
}

export function setupBoard({ targets, obstacles, rows, columns }: GameConfig) {
  const plan = Array.from(Array(rows)).map(() => Array(columns).fill("0"));

  let [i, j] = findEmptyCell(plan, rows, columns);
  plan[i][j] = "player";

  [i, j] = findEmptyCell(plan, rows, columns);
  plan[i][j] = "weapon";

  [i, j] = findEmptyCell(plan, rows, columns);
  plan[i][j] = "end";

  Array.from(Array(obstacles)).forEach(() => {
    const [i, j] = findEmptyCell(plan, rows, columns);
    plan[i][j] = "obstacle";
  });
  Array.from(Array(targets)).forEach(() => {
    const [i, j] = findEmptyCell(plan, rows, columns);
    plan[i][j] = "target";
  });

  return plan;
}

export const changePlan = (
  currentPlan: string[][],
  currentPosition: number[]
) => {
  const numRows = currentPlan.length,
    numCols = currentPlan[0].length;
  let plan = Array.from(Array(numRows)).map(() => Array(numCols).fill("0"));

  let numF = 0,
    numV = 0,
    numL = 0;
  currentPlan.forEach((row, i) => {
    row.forEach((col, j) => {
      switch (col) {
        case "obstacle":
          numF++;
          break;
        case "target":
          numV++;
          break;
        case "weapon":
          numL++;
          break;
      }
    });
  });

  let [i, j] = currentPosition;
  plan[i][j] = "player";

  if (numL) {
    [i, j] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = "weapon";
  }

  [i, j] = findEmptyCell(plan, numRows, numCols);
  plan[i][j] = "end";

  Array.from(Array(numF)).forEach(() => {
    const [i, j] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = "obstacle";
  });
  Array.from(Array(numV)).forEach(() => {
    const [i, j] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = "target";
  });

  return plan;
};

export enum Token {
  weapon = "weapon",
  target = "target",
  end = "end",
  obstacle = "obstacle",
}

export function isToken(value: string): value is Token {
  return value in Token;
}
