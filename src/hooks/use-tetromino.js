import { useCallback, useState } from 'react';

import produce from 'immer';

import { tetrominoMap } from 'const';

import { TetrominoPosition } from 'view-models';

export const useTetromino = ({ width }) => {
  const [tetromino, setTetromino] = useState(null);
  const [position, setPosition] = useState(new TetrominoPosition()); // should be apart from "Tetromino" class;

  const randomize = useCallback(() => {
    const keys = [...tetrominoMap.keys()];
    const item = tetrominoMap.get(keys[Math.random() * keys.length | 0]).clone();

    setTetromino(item);
    setPosition(new TetrominoPosition(0, (width - item.width) / 2 | 0));
  }, [width]);

  const makeMove = move => {
    if (move.isRotation) setTetromino(tetromino.clone().rotate(move.direction));
    else setPosition(prevPosition => produce(prevPosition, draft => {
      const { rowAddress = 0, colAddress = 0 } = move.offset;

      draft.rowAddress += rowAddress;
      draft.colAddress += colAddress;
    }));
  };

  return { tetromino, position, randomize, makeMove };
};
