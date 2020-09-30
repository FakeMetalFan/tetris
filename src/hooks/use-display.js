import { useEffect, useMemo, useState } from 'react';

import produce from 'immer';

import some from 'lodash/some';

import { TileVM } from 'view-models';

import { useDidUpdate, useTetromino, useSafeRef } from '.';

export const useDisplay = ({ width, height, move }) => {
  const emptyRow = useMemo(() => Array(width).fill(new TileVM()), [width]);
  const emptyDisplay = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const [display, setDisplay] = useState(emptyDisplay);
  const [sweptRowsCount, setSweptRowsCount] = useState(0);

  const { tetromino, randomize, makeMove } = useTetromino({ width });

  const [mergedDisplay, setMergedDisplay] = useSafeRef(display); // to recreate state when a new tetromino is drawn;

  const didCollide = () => tetromino.matrix.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
    const targetRowAddress = rowAddress + tetromino.rowAddress;
    const targetColAddress = colAddress + tetromino.colAddress;

    return !isEmpty && (!mergedDisplay[targetRowAddress]?.[targetColAddress]?.isEmpty // filled tile;
      || targetRowAddress >= height // floor;
      || (targetColAddress >= width || targetColAddress < 0) // walls;
    );
  }));

  useEffect(() => { // drawing;
    if (didCollide())
      if (move.isDown) setMergedDisplay(display);
      else makeMove(move.getOppositeMove());
    else setDisplay(produce(mergedDisplay, draft => {
      tetromino.matrix.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !tile.isEmpty && (draft[rowAddress + tetromino.rowAddress][colAddress + tetromino.colAddress] = tile);
        });
      });
    }));
    // eslint-disable-next-line
  }, [tetromino.matrix, tetromino.position]);

  useDidUpdate(() => {
    makeMove(move);
  }, move);

  useDidUpdate(() => {
    randomize();
  }, mergedDisplay);

  useDidUpdate(() => { // filled rows sweep;
    const filledRowsAddresses = mergedDisplay.reduce((acc, row, rowAddress) => {
      !some(row, 'isEmpty') && acc.push(rowAddress);

      return acc;
    }, []);

    if (filledRowsAddresses.length) {
      setMergedDisplay(produce(mergedDisplay, draft => {
        filledRowsAddresses.forEach(address => {
          draft.splice(address, 1);
          draft.unshift(emptyRow);
        });
      }));
      setSweptRowsCount(count => count + filledRowsAddresses.length);
    }
  }, mergedDisplay);

  useDidUpdate(() => { // game over, reset;
    if (didCollide()) {
      setDisplay(emptyDisplay);
      setMergedDisplay(emptyDisplay);
      setSweptRowsCount(0);
    }
  }, tetromino.id);

  return { display, sweptRowsCount };
};
