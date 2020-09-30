import { useMemo, useEffect, useState } from 'react';

import produce from 'immer';

import some from 'lodash/some';

import { TileVM } from 'view-models';

import { useDidUpdate, useTetromino } from '.';

export const useDisplay = ({ width, height, move }) => {
  const emptyRow = useMemo(() => Array(width).fill(new TileVM()), [width]);
  const emptyDisplay = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const [display, setDisplay] = useState(emptyDisplay);
  const [mergedDisplay, setMergedDisplay] = useState(display); // readonly, no need to clone;
  const [sweptRowsCount, setSweptRowsCount] = useState(0);

  const { tetromino, position, randomize, makeMove } = useTetromino({ width });

  const didCollide = () => tetromino.matrix.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
    const targetRowAddress = rowAddress + position.rowAddress;
    const targetColAddress = colAddress + position.colAddress;

    return !isEmpty && (!mergedDisplay[targetRowAddress]?.[targetColAddress]?.isEmpty // filled tile;
      || targetRowAddress >= height // floor;
      || (targetColAddress >= width || targetColAddress < 0) // walls;
    );
  }));

  useEffect(() => {
    randomize();
  }, [randomize, mergedDisplay]);

  useDidUpdate(() => {
    makeMove(move);
  }, move);

  useDidUpdate(() => {
    if (didCollide())
      if (move.isDown) setMergedDisplay(display);
      else makeMove(move.getOppositeMove());
    else setDisplay(produce(mergedDisplay, draft => {
      tetromino.matrix.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !tile.isEmpty && (draft[rowAddress + position.rowAddress][colAddress + position.colAddress] = tile);
        });
      });
    }));
  }, tetromino, position);

  useDidUpdate(() => {
    const filledRowsAddresses = mergedDisplay.reduce((acc, row, rowAddress) => {
      !some(row, 'isEmpty') && acc.push(rowAddress);

      return acc;
    }, []);

    if (filledRowsAddresses.length) {
      setMergedDisplay(prevMergedDisplay => produce(prevMergedDisplay, draft => {
        filledRowsAddresses.forEach(address => {
          draft.splice(address, 1);
          draft.unshift(emptyRow);
        });
      }));
      setSweptRowsCount(count => count + filledRowsAddresses.length);
    }
  }, mergedDisplay);

  useDidUpdate(() => {
    if (move?.isDown && didCollide()) {
      setDisplay(emptyDisplay);
      setMergedDisplay(emptyDisplay);
      setSweptRowsCount(0);
    }
  }, tetromino);

  return { display, sweptRowsCount };
};
