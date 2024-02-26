import React, { useEffect, useRef, useState } from "react";
import Trophy from "images/trophy.inline.svg";
import { Modal } from "../modal/Modal";

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
      {props.won ? (
        <Modal
          content={
            <div>
              <h2 className="message">Congratulations, Young Jedi!</h2>
            </div>
          }
          onClose={props.restart}
        ></Modal>
      ) : (
        <Modal
          content={
            <h2 className="message">May the Force Guide You Next Time!</h2>
          }
          onClose={props.restart}
          primaryAction={{ content: "Try again", onAction: props.restart }}
          hideCloseButton
        ></Modal>
      )}
    </>
  );
};
