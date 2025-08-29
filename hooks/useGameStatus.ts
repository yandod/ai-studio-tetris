
import { useState, useEffect, useCallback } from 'react';

const linePoints = [40, 100, 300, 1200];

export const useGameStatus = (rowsCleared: number) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(1);

    useEffect(() => {
        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared - 1] * level);
            setRows(prev => prev + rowsCleared);
        }
    }, [rowsCleared, level]);

    return { score, setScore, rows, setRows, level, setLevel };
};
