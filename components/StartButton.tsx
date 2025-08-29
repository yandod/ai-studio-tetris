
import React from 'react';

type Props = {
    callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => {
    return (
        <button
            className="p-4 w-full text-white text-sm md:text-base bg-blue-600 hover:bg-blue-700 border-b-4 border-blue-800 hover:border-blue-900 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:scale-105 active:scale-100 focus:outline-none"
            onClick={callback}
        >
            ゲーム開始
        </button>
    );
};

export default StartButton;
