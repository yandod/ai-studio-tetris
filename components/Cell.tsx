
import React from 'react';
import { TETROMINOS } from '../game/constants';

type Props = {
    type: string | number;
};

const Cell: React.FC<Props> = ({ type }) => {
    const color = type === 0 ? 'bg-gray-800' : TETROMINOS[type as keyof typeof TETROMINOS].color;
    const border = type === 0 ? '' : 'border-b-4 border-r-4';
    const borderColor = type === 0 ? '' : TETROMINOS[type as keyof typeof TETROMINOS].borderColor;

    return (
        <div className={`w-auto aspect-square ${color} ${border} ${borderColor}`}></div>
    );
};

export default React.memo(Cell);
