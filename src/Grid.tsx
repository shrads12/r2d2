import React, { useState } from 'react';
import { Cell } from "./Cell";

interface Props {
    board: string[][];
    currentPosition: number[];
    onMove: (newPosition: number[]) => void;
    onEnter: () => void;
}

export const Grid = (props: Props) => {
    const onkeydown = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                props.onMove(moveLeft());
                break;
            case 'ArrowRight':
                props.onMove(moveRight());
                break;
            case 'ArrowUp':
                props.onMove(moveUp());
                break;
            case 'ArrowDown':
                props.onMove(moveDown());
                break;
            case 'Enter':
                props.onEnter();
            default:
                console.log('Do nothing', event.key);
        }
        event.preventDefault();
    }

    const moveLeft = () => {
        const [i, j] = props.currentPosition;
        const newCol = (j - 1) < 0 ? j : j - 1;
        return [i, newCol];
    }

    const moveRight = () => {
        const [i, j] = props.currentPosition;
        const newCol = (j + 1) === props.board[i].length ? j : j + 1;
        return [i, newCol];
    }

    const moveUp = () => {
        const [i, j] = props.currentPosition;
        const newRow = i - 1 < 0 ? i : i - 1;
        return [newRow, j];
    }

    const moveDown = () => {
        const [i, j] = props.currentPosition;
        const newRow = (i + 1) === props.board.length ? i : i + 1;
        return [newRow, j];
    }

    return (
        <div className="grid-container"
            onKeyDown={onkeydown}>
            {props.board.map((row, i) => {
                return row.map((col, j) => {
                    const isCurrentPosition = props.currentPosition[0] === i && props.currentPosition[1] === j;
                    return <Cell items={[col]} key={i + '#' + j} isCurrentCell={isCurrentPosition}></Cell>
                })
            }
            )}
        </div>
    );
}