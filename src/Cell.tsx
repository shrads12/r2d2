import React from 'react';

interface Props {
    items: string[];
    isCurrentCell: boolean;
}

export const Cell = (props: Props) => {

    const classMap = {
        M: 'medal',
        F: 'fire',
        L: 'lightsaber',
        V: 'darthvader'
    }

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
        <button autoFocus={props.isCurrentCell} className={`item ${getClasses()}`}></button>
    )
}