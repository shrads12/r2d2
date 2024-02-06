import React, { useEffect, useRef } from "react";
import { isToken } from "./util";
import "./App.css";

interface Props {
  items: string[];
  isCurrentCell: boolean;
}

export const Cell = (props: Props) => {
  let btnRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    props.isCurrentCell && btnRef.current && btnRef.current.focus();
  });

  const getClasses = () => {
    const classes = props.items.map((item) =>
      isToken(item) ? item.toString() : ""
    );
    props.isCurrentCell && classes.push("avatar");
    return classes.join(" ");
  };

  const getAvatar = () => {
    return <img className="avatar" src="../images/r2d2.svg"></img>;
  };

  return <button ref={btnRef} className={`item ${getClasses()}`}></button>;
};
