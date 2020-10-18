import { useState } from 'react';

import { tetrominos } from 'const';

import { Tetromino } from 'view-models';

export const useTetromino = ({ width }) => {
  const [tetromino, setTetromino] = useState(new Tetromino);

  const randomize = () => {
    const item = tetrominos[Math.random() * tetrominos.length | 0].clone();

    setTetromino(item.move({ colAddress: (width - item.width) / 2 | 0 }));
  };

  const makeMove = move => {
    setTetromino(move.isRotation ? tetromino.rotate() : tetromino.move(move.offset));
  };

  return { tetromino, randomize, makeMove };
};
