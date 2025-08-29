
// Fix: Import TETROMINO type to use it as a return type for randomTetromino.
import type { TETROMINOS, TETROMINO } from '../types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINOS: TETROMINOS = {
  // Fix: Add borderColor to conform to the TETROMINO type.
  '0': { shape: [[0]], color: 'bg-transparent', borderColor: '' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0]
    ],
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-700'
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0]
    ],
    color: 'bg-blue-600',
    borderColor: 'border-blue-800'
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L']
    ],
    color: 'bg-orange-500',
    borderColor: 'border-orange-700'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O']
    ],
    color: 'bg-yellow-400',
    borderColor: 'border-yellow-600'
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0]
    ],
    color: 'bg-green-500',
    borderColor: 'border-green-700'
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0]
    ],
    color: 'bg-purple-600',
    borderColor: 'border-purple-800'
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0]
    ],
    color: 'bg-red-600',
    borderColor: 'border-red-800'
  },
};

export const randomTetromino = (): TETROMINO => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)] as keyof typeof TETROMINOS;
  return TETROMINOS[randTetromino];
};