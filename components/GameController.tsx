
import React from 'react';

const GameController: React.FC = () => {
  return (
    <div className="p-4 w-full bg-gray-800 border-2 border-gray-600 rounded-lg shadow-inner text-white text-xs md:text-sm">
      <h2 className="text-center font-bold mb-4">操作方法</h2>
      <ul className="space-y-2">
        <li><span className="font-bold text-green-400">←</span> : 左に移動</li>
        <li><span className="font-bold text-green-400">→</span> : 右に移動</li>
        <li><span className="font-bold text-green-400">↓</span> : ソフトドロップ</li>
        <li><span className="font-bold text-green-400">↑</span> : 回転</li>
        <li><span className="font-bold text-green-400">スペース</span> : ハードドロップ</li>
      </ul>
    </div>
  );
};

export default GameController;
