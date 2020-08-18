import React, { useState } from 'react';
import { Objects, createPlan, changePlan } from './gamePlans';
import { GameEnd } from './GameEnd';
import { Grid } from './Grid';

interface State {
    board: string[][];
    currentPosition: number[];
    won: boolean;
    objects: string[],
    targets: string[]
}

export default class Game extends React.Component<{}, State> {

    private numTargets = 2;
    private interval:any;

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.useInterval = this.useInterval.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentDidMount() {
        // this.interval = setInterval(this.useInterval, 5000);
    }

    useInterval() {
        return () => {
            this.setState(({board, currentPosition}) => {
                const newPlan = changePlan(board, currentPosition);
                return {board: newPlan, currentPosition: this.findPosition(newPlan)}
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    findPosition = (board) => {
        let pos;
        board.some((row, i) => {
            return row.some((col, j) => {
                if (col === 'S') {
                    pos = [i, j];
                    return true;
                }
            });
        });
        return pos;
    }


    getInitialState = () => {

        const plan = createPlan(5, this.numTargets, 5, 5);
        return {
            board: plan,
            currentPosition: this.findPosition(plan),
            won: null,
            objects: [],
            targets: []
        }
    }

 
    restart = () => {
        this.setState(this.getInitialState());
    }


    didIWin = () => {
        const [i, j] = this.state.currentPosition;
        if (this.state.board[i][j] === 'M' && this.state.targets.length === this.numTargets) {
            this.setState({won: true }, () => {
                clearInterval(this.interval);
            });
        }
    }

    onEnter = () => {
        const [i, j] = this.state.currentPosition;
        const object = this.state.board[i][j];
        if (!Objects[object]) return;
        switch (object) {
            case 'L': {
                this.setState(({objects, board})=> {
                    if (Objects[object]) {
                        objects.push(object);
                        board[i][j] = '0';
                    }
                    return {objects, board};
                });
                break;
            }
            case 'V': {
                const [i, j] = this.state.currentPosition;
                const object = this.state.board[i][j];
                this.setState(({objects, board, targets}) => {
                    if (objects.indexOf('L') !== -1) {
                        board[i][j] = '0';
                        targets.push(object);
                    }
                    return {board, targets};
                })
                break;
            }
            case 'M':
                this.didIWin();
                break;
        }
    }

    updatePosition = (newPosition) => {
        let { board, won } = this.state;
        const [newRow, newCol] = newPosition;
        if (board[newRow][newCol] === 'F') {
            won = false;
        }
        this.setState({ board, currentPosition: [newRow, newCol], won });
    }

    render() {

        document.documentElement.style.setProperty("--rowNum", this.state.board.length.toString());
        document.documentElement.style.setProperty("--colNum", this.state.board[0].length.toString());


    return (
        <div className="game-container">
            <Grid board={this.state.board} onMove={this.updatePosition} currentPosition={this.state.currentPosition} 
                onEnter={this.onEnter}></Grid>
            <div className="object-container">
                {this.state.objects.map(obj => {
                    return <div className={`object ${Objects[obj]}`}></div>
                })}
                {this.state.targets.map(obj => {
                    return <div className={`target ${Objects[obj]}`}></div>
                })}
            </div>
            {this.state.won != null &&
                <GameEnd won={this.state.won} restart={this.restart}></GameEnd>
            }
        </div>
    );
    }



}