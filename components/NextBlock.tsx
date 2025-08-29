
import React from 'react';
import type { TETROMINO } from '../types';
import Cell from './Cell';

type Props = {
  tetromino: TETROMINO;
};

const NextBlock: React.FC<Props> = ({ tetromino }) => {
  const { shape, color } = tetromino;

  // Find the actual bounds of the shape to center it
  const filteredShape = shape.filter(row => row.some(cell => cell !== 0));
  const shapeWidth = Math.max(...filteredShape.map(row => row.length));

  return (
    <div className="p-4 w-full bg-gray-800 border-2 border-gray-600 rounded-lg shadow-inner flex flex-col items-center">
      <h2 className="text-white text-sm md:text-base mb-4">次のブロック</h2>
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: `repeat(${shapeWidth}, 1fr)`,
        }}
      >
        {filteredShape.map((row, y) =>
          row.map((cell, x) => (
            <div key={`${y}-${x}`} className="w-5 h-5 md:w-6 md:h-6">
              {cell !== 0 && <Cell type={cell} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NextBlock;
