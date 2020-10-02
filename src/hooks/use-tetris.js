import { useEffect, useMemo, useState } from 'react';

import produce from 'immer';

import some from 'lodash/some';

import { Position, TileVM } from 'view-models';

import { useDidUpdate, useTetromino } from '.';

export const useTetris = ({ width, height, move }) => {
  /* eslint-disable new-parens */
  const emptyRow = useMemo(() => Array(width).fill(new TileVM), [width]);
  const emptyState = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const [state, setState] = useState(emptyState);
  const [mergedState, setMergedState] = useState(state);
  const [sweptRowsCount, setSweptRowsCount] = useState(0);

  const { tetromino, randomize, makeMove } = useTetromino({ width });

  const detectCollision = ({ matrix = tetromino.matrix, offset = new Position } = {}) =>
    matrix.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
      const rowAddressAhead = rowAddress + tetromino.rowAddress + offset.rowAddress;
      const colAddressAhead = colAddress + tetromino.colAddress + offset.colAddress;

      return !isEmpty && (!mergedState[rowAddressAhead]?.[colAddressAhead]?.isEmpty
        || rowAddressAhead >= height || colAddressAhead >= width || colAddressAhead < 0
      );
    }));

  useEffect(() => {
    setState(produce(mergedState, draft => {
      tetromino.matrix.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !tile.isEmpty && (draft[rowAddress + tetromino.rowAddress][colAddress + tetromino.colAddress] = tile);
        });
      });
    }));
    // eslint-disable-next-line
  }, [tetromino.matrix, tetromino.position]);

  useDidUpdate(() => {
    if (detectCollision(move.isRotation ? tetromino.clone().rotate() : move)) {
      if (!move.isDown) return;

      const filledRowsAddresses = state.reduce((acc, row, rowAddress) => {
        !some(row, 'isEmpty') && acc.push(rowAddress);

        return acc;
      }, []);

      if (filledRowsAddresses.length) {
        setMergedState(produce(state, draft => {
          filledRowsAddresses.forEach(address => {
            draft.splice(address, 1);
            draft.unshift(emptyRow);
          });
        }));
        setSweptRowsCount(count => count + filledRowsAddresses.length);
      } else setMergedState(state);
    } else makeMove(move);
  }, move);

  useDidUpdate(() => {
    randomize();
  }, mergedState);

  useDidUpdate(() => {
    if (detectCollision()) {
      setState(emptyState);
      setMergedState(emptyState);
      setSweptRowsCount(0);
    }
  }, tetromino.id);

  return { state, sweptRowsCount };
};
