import { useReducer } from 'react';

import produce from 'immer';

import { matrices } from 'const';

import { Position } from 'view-models';

import { getRotatedMatrix } from 'utils/rotated-matrix';

const actionType = {
  Random: 'random',
  Rotation: 'rotation',
  Move: 'move',
};

const reducer = (state, { type, payload }) => produce(state, draft => {
  switch (type) {
    case actionType.Random:
      draft.id = Symbol(); // to always detect a new tetromino;
      draft.matrix = matrices[Math.random() * matrices.length | 0];
      draft.position = new Position(0, (payload.width - draft.matrix.length) / 2 | 0);

      break;
    case actionType.Move:
      const { rowAddress = 0, colAddress = 0 } = payload.offset;

      draft.position = produce(draft.position, dr => {
        dr.rowAddress += rowAddress;
        dr.colAddress += colAddress;
      });

      break;
    case actionType.Rotation:
      draft.matrix = getRotatedMatrix(draft.matrix);
  }
});

export const useTetromino = ({ width }) => {
  const [{ id, matrix, position }, dispatch] = useReducer(reducer, {
    id: Symbol(),
    matrix: [],
    position: new Position,
  });

  const randomize = () => {
    dispatch({ type: actionType.Random, payload: { width } });
  };

  const makeMove = ({ isRotation, offset }) => {
    dispatch(isRotation ? { type: actionType.Rotation } : { type: actionType.Move, payload: { offset } });
  };

  return { id, matrix, position, randomize, makeMove };
};
