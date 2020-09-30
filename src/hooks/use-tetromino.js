import { useState } from 'react';

import { tetrominoMap } from 'const';

export const useTetromino = ({ width }) => {
  const getRandomTetromino = () => {
    const keys = [...tetrominoMap.keys()];
    const item = tetrominoMap.get(keys[Math.random() * keys.length | 0]);

    return item.clone().setColAddress((width - item.width) / 2 | 0);
  };

  const [tetromino, setTetromino] = useState(() => getRandomTetromino());

  const randomize = () => {
    setTetromino(getRandomTetromino());
  };

  const makeMove = move => {
    const item = tetromino.clone();

    setTetromino(move.isRotation ? item.rotate() : item.setOffset(move.offset));
  };

  return { tetromino, randomize, makeMove };
};
