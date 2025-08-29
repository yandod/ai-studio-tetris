
import React from 'react';

type Props = {
    gameOver?: boolean;
    text: string;
};

const Display: React.FC<Props> = ({ gameOver, text }) => {
    return (
        <div className={`flex items-center justify-center p-4 min-h-[60px] w-full text-white text-sm md:text-base bg-gray-800 border-2 border-gray-600 rounded-lg shadow-inner ${gameOver ? 'text-red-500' : 'text-green-400'}`}>
            {text}
        </div>
    );
};

export default Display;
