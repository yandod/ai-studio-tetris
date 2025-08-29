
export type TETROMINO_SHAPE = (string | number)[][];

export type TETROMINO = {
  shape: TETROMINO_SHAPE;
  color: string;
  // Fix: Add borderColor property to match its usage in the constants and Cell component.
  borderColor: string;
};

export type TETROMINOS = {
  [key: string]: TETROMINO;
};

export type PLAYER = {
  pos: { x: number; y: number };
  tetromino: TETROMINO_SHAPE;
  nextTetromino: TETROMINO_SHAPE;
  collided: boolean;
};

export type CELL_STATE = 'clear' | 'merged';

export type CELL = [string | number, CELL_STATE];

export type BOARD = CELL[][];