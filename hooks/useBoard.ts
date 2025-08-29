
import { useState, useEffect, useCallback } from 'react';
import { createBoard } from '../game/gameHelpers';
// Fix: Import CELL type to use for type assertions.
import type { BOARD, PLAYER, CELL } from '../types';

export const useBoard = (player: PLAYER, resetPlayer: () => void) => {
    const [board, setBoard] = useState(createBoard());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = (newBoard: BOARD): BOARD => 
            newBoard.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    // Fix: Use type assertion to prevent type widening and ensure the new row has the correct CELL[] type.
                    ack.unshift(new Array(newBoard[0].length).fill([0, 'clear'] as CELL));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [] as BOARD);


        const updateBoard = (prevBoard: BOARD): BOARD => {
            // Fix: Use type assertion to prevent type widening and ensure newBoard has the correct BOARD (CELL[][]) type.
            const newBoard = prevBoard.map(
                row => row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] as CELL : cell))
            );

            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newBoard[y + player.pos.y][x + player.pos.x] = [
                            value,
                            player.collided ? 'merged' : 'clear'
                        ];
                    }
                });
            });

            if (player.collided) {
                resetPlayer();
                return sweepRows(newBoard);
            }

            return newBoard;
        };

        setBoard(prev => updateBoard(prev));

    }, [player, resetPlayer]);

    return { board, setBoard, rowsCleared };
};