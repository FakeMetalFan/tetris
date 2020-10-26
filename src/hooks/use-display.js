import { useEffect, useMemo, useReducer } from 'react';

import produce from 'immer';

import cloneDeep from 'lodash/cloneDeep';
import some from 'lodash/some';

import { Position, TileVM } from 'view-models';

import { getRotatedMatrix } from 'utils/rotated-matrix';

import { useDidUpdate, useTetromino } from '.';

const actionType = {
  DrawTetromino: 'draw-tetromino',
  SweepFilledRows: 'sweep-filled-rows',
  MergeState: 'merge-state',
  Reset: 'reset',
};

const reducer = (state, { type, payload }) => type === actionType.Reset ? cloneDeep(payload) : produce(state, draft => {
  switch (type) {
    case actionType.DrawTetromino:
      draft.current = produce(draft.merged, dr => {
        const { matrix, position } = payload;

        matrix.forEach((row, rowAddress) => {
          row.forEach((tile, colAddress) => {
            !tile.isEmpty && (dr[rowAddress + position.rowAddress][colAddress + position.colAddress] = tile);
          });
        });
      });

      break;
    case actionType.SweepFilledRows:
      const { filledRowsAddresses, emptyRow } = payload;

      draft.sweptRowsCount += filledRowsAddresses.length;
      draft.merged = produce(draft.current, dr => {
        filledRowsAddresses.forEach(address => {
          dr.splice(address, 1);
          dr.unshift(emptyRow);
        });
      });

      break;
    case actionType.MergeState:
      draft.merged = draft.current;
  }
});

export const useDisplay = ({ width, height, move }) => {
  const emptyRow = useMemo(() => Array(width).fill(new TileVM), [width]);
  const emptyState = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const initialState = { current: emptyState, merged: emptyState, sweptRowsCount: 0 };

  const [{ current, merged, sweptRowsCount }, dispatch] = useReducer(reducer, initialState);
  const { id, matrix, position, randomize, makeMove } = useTetromino({ width });

  const detectCollision = ({ tetrominoState = matrix, offset = new Position } = {}) =>
    tetrominoState.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
      const rowAddressAhead = rowAddress + position.rowAddress + offset.rowAddress;
      const colAddressAhead = colAddress + position.colAddress + offset.colAddress;

      return !isEmpty && (!merged[rowAddressAhead]?.[colAddressAhead]?.isEmpty
        || rowAddressAhead >= height || colAddressAhead >= width || colAddressAhead < 0
      );
    }));

  useEffect(() => {
    randomize();
  }, [merged]);

  useEffect(() => {
    dispatch({ type: actionType.DrawTetromino, payload: { matrix, position } });
  }, [matrix, position]);

  useDidUpdate(() => {
    if (detectCollision(move.isRotation ? { tetrominoState: getRotatedMatrix(matrix) } : move)) {
      if (move.isDown) {
        const filledRowsAddresses = current.reduce((ac, row, rowAddress) => {
          !some(row, 'isEmpty') && ac.push(rowAddress);

          return ac;
        }, []);

        dispatch(filledRowsAddresses.length
          ? { type: actionType.SweepFilledRows, payload: { filledRowsAddresses, emptyRow } }
          : { type: actionType.MergeState }
        );
      }
    } else makeMove(move);
  }, move);

  useDidUpdate(() => {
    detectCollision() && dispatch({ type: actionType.Reset, payload: initialState });
  }, id);

  return { sweptRowsCount, displayState: current };
};
