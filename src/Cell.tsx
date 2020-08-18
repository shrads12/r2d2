import React, { useEffect, RefObject, useRef } from 'react';

interface Props {
    items: string[];
    isCurrentCell: boolean;
}

export const Cell = (props: Props) => {

    let btnRef = useRef<HTMLButtonElement>()

    const classMap = {
        M: 'medal',
        F: 'fire',
        L: 'lightsaber',
        V: 'darthvader'
    }

    useEffect(() => {
        props.isCurrentCell && btnRef.current && btnRef.current.focus();
    });

    const getClasses = () => {
        const classes = props.items.map(item => {
            return classMap[item];
        });
        props.isCurrentCell && classes.push('avatar');
        return classes.join(' ');
    }

    const getAvatar = () => {
        return <img className="avatar" src="../images/r2d2.svg"></img>
    }

    return (
        <button ref={btnRef} className={`item ${getClasses()}`}></button>
    )
}