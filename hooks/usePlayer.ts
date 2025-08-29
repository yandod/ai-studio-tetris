
import { useState, useCallback } from 'react';
// Fix: Import BOARD_WIDTH from constants file where it is exported.
import { TETROMINOS, randomTetromino, BOARD_WIDTH } from '../game/constants';
// Fix: Only import checkCollision from gameHelpers as BOARD_WIDTH is not exported from there.
import { checkCollision } from '../game/gameHelpers';
import type { PLAYER, TETROMINO_SHAPE, BOARD } from '../types';

export const usePlayer = () => {
    const [player, setPlayer] = useState<PLAYER>({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS['0'].shape,
        nextTetromino: randomTetromino().shape,
        collided: false,
    });
    
    const [nextTetromino, setNextTetromino] = useState(randomTetromino());

    const rotate = (matrix: TETROMINO_SHAPE, dir: number) => {
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col => col[index])
        );
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (board: BOARD, dir: number) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean; }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        // Fix: Call randomTetromino once and use the result for both player state and nextTetromino state.
        const newNextTetromino = randomTetromino();
        setPlayer({
            pos: { x: BOARD_WIDTH / 2 - 1, y: 0 },
            tetromino: nextTetromino.shape,
            // Fix: Add missing nextTetromino property to conform to the PLAYER type.
            nextTetromino: newNextTetromino.shape,
            collided: false,
        });
        setNextTetromino(newNextTetromino);
    }, [nextTetromino]);

    return { player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino };
};