import { useState } from 'react';

import { tetrominoMap } from 'const';

export const useTetromino = ({ width }) => {
  const getRandomTetromino = () => {
    const keys = [...tetrominoMap.keys()];
    const item = tetrominoMap.get(keys[Math.random() * keys.length | 0]);

    return item.getCloned((width - item.width) / 2 | 0);
  };

  const [tetromino, setTetromino] = useState(() => getRandomTetromino());

  const randomize = () => {
    setTetromino(getRandomTetromino());
  };

  const makeMove = move => {
    setTetromino(move.isRotation ? tetromino.getRotated(move.direction) : tetromino.getMoved(move.offset));
  };

  return { tetromino, randomize, makeMove };
};
