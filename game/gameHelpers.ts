
import type { BOARD, PLAYER, CELL } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from './constants';

export const createBoard = (): BOARD =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill([0, 'clear']));

export const checkCollision = (
  player: { pos: { x: number; y: number }; tetromino: (string | number)[][] },
  board: BOARD,
  { x: moveX, y: moveY }: { x: number; y: number }
): boolean => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
