import React from 'react';

interface Props {
    won: boolean,
    restart: () => void;
}

export const GameEnd = (props: Props) => {
    return (
        <>
            <div className="overlay"></div>
            <div className="playAgain">
                {props.won ?
                    <div>
                        <img src="../images/trophy.svg" className="trophy" />
                        <h1 className="message">Great job!</h1>
                    </div> :

                    <h1 className="message">Oh no! Try again!</h1>
                }
                <button autoFocus={true} onClick={props.restart}>Play Again</button>
            </div>
        </>
    )
}