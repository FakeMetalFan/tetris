import { useState } from 'react';

import produce from 'immer';

import { tetrominoMatrix } from 'const';

import { getRotatedMatrix } from 'utils';

export const useTetromino = ({ width }) => {
  const [state, setState] = useState([]);
  const [position, setPosition] = useState({ rowAddress: 0, colAddress: 0 });

  const randomize = () => {
    const keys = Object.keys(tetrominoMatrix);
    const matrix = tetrominoMatrix[keys[Math.random() * keys.length | 0]];

    setState(matrix);
    setPosition({ rowAddress: 0, colAddress: (width - matrix.length) / 2 | 0 });
  };

  const move = ({ rowAddressOffset = 0, colAddressOffset = 0 }) => {
    setPosition(produce(position, draft => {
      draft.rowAddress += rowAddressOffset;
      draft.colAddress += colAddressOffset;
    }));
  };

  const rotate = () => {
    setState(getRotatedMatrix(state));
  };

  return { state, position, randomize, move, rotate };
};
