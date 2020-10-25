import { useEffect, useMemo, useState } from 'react';

import produce from 'immer';

import some from 'lodash/some';

import { Position, TileVM } from 'view-models';

import { useDidUpdate, useTetromino } from '.';

export const useDisplay = ({ width, height, move }) => {
  const emptyRow = useMemo(() => Array(width).fill(new TileVM), [width]);
  const emptyState = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const initialState = { current: emptyState, merged: emptyState, sweptRowsCount: 0 };

  const [state, setState] = useState(initialState);

  const { current, merged, sweptRowsCount } = state;

  const { tetromino, randomize, makeMove } = useTetromino({ width });

  const { matrix, position } = tetromino;

  const detectCollision = ({ tetrominoState = matrix, offset = new Position } = {}) =>
    tetrominoState.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
      const rowAddressAhead = rowAddress + tetromino.rowAddress + offset.rowAddress;
      const colAddressAhead = colAddress + tetromino.colAddress + offset.colAddress;

      return !isEmpty && (!merged[rowAddressAhead]?.[colAddressAhead]?.isEmpty
        || rowAddressAhead >= height || colAddressAhead >= width || colAddressAhead < 0
      );
    }));

  useEffect(() => {
    randomize();
  }, [merged]);

  useEffect(() => {
    setState({ ...state, current: produce(merged, draft => {
      matrix.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !tile.isEmpty && (draft[rowAddress + tetromino.rowAddress][colAddress + tetromino.colAddress] = tile);
        });
      });
    }) });
  }, [matrix, position]);

  useDidUpdate(() => {
    if (detectCollision(move.isRotation ? tetromino.clone().rotate() : move)) {
      if (move.isDown) {
        const filledRowsAddresses = current.reduce((ac, row, rowAddress) => {
          !some(row, 'isEmpty') && ac.push(rowAddress);

          return ac;
        }, []);

        const { length } = filledRowsAddresses;

        if (length) setState({ ...state, sweptRowsCount: sweptRowsCount + length, merged: produce(current, draft => {
          filledRowsAddresses.forEach(address => {
            draft.splice(address, 1);
            draft.unshift(emptyRow);
          });
        }) });
        else setState({ ...state, merged: current });
      }
    } else makeMove(move);
  }, move);

  useDidUpdate(() => {
    detectCollision() && setState({ ...initialState });
  }, tetromino.id);

  return { sweptRowsCount, state: current };
};
