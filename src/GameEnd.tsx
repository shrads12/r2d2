import React, { useEffect, useRef } from "react";
import Trophy from "../images/trophy.inline.svg";

interface Props {
  won: boolean;
  restart: () => void;
}

export const GameEnd = (props: Props) => {
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (buttonRef?.current) {
      buttonRef?.current?.focus();
    }
  }, []);
  return (
    <>
      <div className="overlay"></div>
      <div className="playAgain">
        {props.won ? (
          <>
            <Trophy width={200} height={200} />
            <h1 className="message">You won!</h1>
          </>
        ) : (
          <h1 className="message">Try again!</h1>
        )}
        <button ref={buttonRef} onClick={props.restart}>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
          >
            <p>Play Again</p>
            <p className="xs italic">Press Enter</p>
          </div>
        </button>
      </div>
    </>
  );
};
