import React, { useEffect, useRef, useState } from "react";
import { isToken } from "../util";

interface Props {
  items: string[];
  isCurrentCell: boolean;
  hidden?: boolean;
}

export const Cell = (props: Props) => {
  let btnRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    props.isCurrentCell && btnRef.current && btnRef.current.focus();
  }, [props.isCurrentCell]);

  function getClasses() {
    const classes = props.items.map((item) =>
      isToken(item) ? item.toString() : ""
    );
    props.isCurrentCell && classes.push("avatar");
    props.hidden && classes.push("hidden");
    return classes.join(" ");
  }

  const getAvatar = () => {
    return <img className="avatar" src="../images/r2d2.svg"></img>;
  };

  return (
    <button ref={btnRef} className="item">
      <div className={getClasses()}></div>
    </button>
  );
};
