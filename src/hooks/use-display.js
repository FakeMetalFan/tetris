import { useCallback, useEffect, useState } from 'react';

import produce from 'immer';

import { tileFill } from 'const';

import { isEmptyTile } from 'utils';

import { useDidUpdate } from './use-did-update';

export const useDisplay = ({ width, height, tetromino, position, randomize }) => {
  const getEmptyRow = useCallback(() => Array(width).fill(tileFill.None), [width]);
  // eslint-disable-next-line
  const getEmptyState = useCallback(() => Array(height).fill(getEmptyRow()), [height]);

  const [state, setState] = useState(() => getEmptyState());
  const [mergedState, setMergedState] = useState(state); // readonly value, needed to detect collision, recreate state;
  const [sweptRowsCount, setSweptRowsCount] = useState(0);

  const willCollide = ({ piece = tetromino, rowAddressOffset = 0, colAddressOffset = 0 } = {}) =>
    piece.some((row, rowAddress) => row.some((tile, colAddress) => {
      const targetRowAddress = rowAddress + position.rowAddress + rowAddressOffset;
      const targetColAddress = colAddress + position.colAddress + colAddressOffset;

      return !isEmptyTile(tile) && (!isEmptyTile(mergedState[targetRowAddress]?.[targetColAddress])
        || targetRowAddress >= height
        || targetColAddress >= width
        || targetColAddress < 0
      );
    }));

  const merge = () => {
    setMergedState(state);
  };

  useEffect(() => {
    randomize();
    // eslint-disable-next-line
  }, [mergedState]);

  useDidUpdate(() => { // drawing piece at the new position;
    const { rowAddress: rowAddressOffset, colAddress: colAddressOffset } = position;

    setState(produce(mergedState, draft => {
      tetromino.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !isEmptyTile(tile) && (draft[rowAddress + rowAddressOffset][colAddress + colAddressOffset] = tile);
        });
      });
    }));
  }, tetromino, position);

  useDidUpdate(() => { // sweeping filled rows;
    const filledRowsAddresses = mergedState.reduce((acc, row, rowAddress) => {
      !row.some(isEmptyTile) && acc.push(rowAddress);

      return acc;
    }, []);

    if (filledRowsAddresses.length) {
      setMergedState(produce(mergedState, draft => {
        filledRowsAddresses.forEach(address => {
          draft.splice(address, 1);
          draft.unshift(getEmptyRow());
        });
      }));
      setSweptRowsCount(count => count + filledRowsAddresses.length);
    }
  }, mergedState);

  useDidUpdate(() => { // game over, reset;
    if (willCollide()) {
      setState(getEmptyState());
      setMergedState(getEmptyState());
      setSweptRowsCount(0);
    }
  }, tetromino);

  return { state, sweptRowsCount, willCollide, merge };
};
