
import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import Display from './components/Display';
import NextBlock from './components/NextBlock';
import StartButton from './components/StartButton';
import GameController from './components/GameController';

import { createBoard, checkCollision } from './game/gameHelpers';
import { usePlayer } from './hooks/usePlayer';
import { useBoard } from './hooks/useBoard';
import { useInterval } from './hooks/useInterval';
import { useGameStatus } from './hooks/useGameStatus';

const App: React.FC = () => {
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(true);

    const { player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino } = usePlayer();
    const { board, setBoard, rowsCleared } = useBoard(player, resetPlayer);
    const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

    const movePlayer = (dir: -1 | 1) => {
        if (!checkCollision(player, board, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0, collided: false });
        }
    };

    const startGame = useCallback(() => {
        setBoard(createBoard());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(1);
    }, [resetPlayer, setBoard, setLevel, setRows, setScore]);


    const drop = useCallback(() => {
        if (rows > level * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / level + 200);
        }

        if (!checkCollision(player, board, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }, [board, level, player, rows, setLevel, updatePlayerPos]);

    const keyUp = ({ keyCode }: { keyCode: number }): void => {
        if (!gameOver) {
            if (keyCode === 40) { // Down arrow
                setDropTime(1000 / level + 200);
            }
        }
    };
    
    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const hardDrop = () => {
      let dropDistance = 0;
      while(!checkCollision(player, board, {x: 0, y: dropDistance + 1})) {
        dropDistance++;
      }
      updatePlayerPos({ x: 0, y: dropDistance, collided: true });
    }

    const move = ({ keyCode, repeat }: { keyCode: number, repeat: boolean }): void => {
        if (!gameOver) {
            if (keyCode === 37) { // Left arrow
                movePlayer(-1);
            } else if (keyCode === 39) { // Right arrow
                movePlayer(1);
            } else if (keyCode === 40) { // Down arrow
                if(repeat) return;
                dropPlayer();
            } else if (keyCode === 38) { // Up arrow
                playerRotate(board, 1);
            } else if (keyCode === 32) { // Space
                hardDrop();
            }
        }
    };
    
    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div 
            className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 font-press-start p-4"
            role="button"
            tabIndex={0}
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <main className="flex justify-center">
                    <Board board={board} />
                </main>
                <aside className="w-full md:w-64 flex flex-col gap-4">
                    {gameOver ? (
                        <Display text={`ゲームオーバー`} gameOver={true} />
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Display text={`スコア: ${score}`} />
                            <Display text={`ライン: ${rows}`} />
                            <Display text={`レベル: ${level}`} />
                            {nextTetromino && <NextBlock tetromino={nextTetromino} />}
                        </div>
                    )}
                    <StartButton callback={startGame} />
                    <GameController />
                </aside>
            </div>
        </div>
    );
};

export default App;
