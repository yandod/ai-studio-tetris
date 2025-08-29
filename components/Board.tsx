
import React from 'react';
import Cell from './Cell';
import type { BOARD } from '../types';

type Props = {
    board: BOARD;
};

const Board: React.FC<Props> = ({ board }) => {
    return (
        <div 
            className="grid gap-px bg-gray-700 border-4 border-gray-600 shadow-lg"
            style={{
                gridTemplateRows: `repeat(${board.length}, 1fr)`,
                gridTemplateColumns: `repeat(${board[0].length}, 1fr)`
            }}
        >
            {board.map(row => 
                row.map((cell, x) => <Cell key={x} type={cell[0]} />)
            )}
        </div>
    );
};

export default Board;
