import { useEffect, useMemo, useState } from 'react';

import produce from 'immer';

import some from 'lodash/some';

import { Position, TileVM } from 'view-models';

import { useDidUpdate, useTetromino } from '.';

export const useDisplay = ({ width, height, move }) => {
  const emptyRow = useMemo(() => Array(width).fill(new TileVM()), [width]);
  const emptyDisplay = useMemo(() => Array(height).fill(emptyRow), [emptyRow, height]);

  const [display, setDisplay] = useState(emptyDisplay);
  const [mergedDisplay, setMergedDisplay] = useState(display); // to draw a new tetromino over previously merged;
  const [sweptRowsCount, setSweptRowsCount] = useState(0);

  const { tetromino, randomize, makeMove } = useTetromino({ width });

  const detectCollision = ({ matrix: state = tetromino.matrix, offset = new Position() } = {}) =>
    state.some((row, rowAddress) => row.some(({ isEmpty }, colAddress) => {
      const targetRowAddress = rowAddress + tetromino.rowAddress + offset.rowAddress;
      const targetColAddress = colAddress + tetromino.colAddress + offset.colAddress;

      return !isEmpty && (!mergedDisplay[targetRowAddress]?.[targetColAddress]?.isEmpty // filled tile;
        || targetRowAddress >= height // floor;
        || (targetColAddress >= width || targetColAddress < 0) // walls;
      );
    }));

  useEffect(() => {
    setDisplay(produce(mergedDisplay, draft => {
      tetromino.matrix.forEach((row, rowAddress) => {
        row.forEach((tile, colAddress) => {
          !tile.isEmpty && (draft[rowAddress + tetromino.rowAddress][colAddress + tetromino.colAddress] = tile);
        });
      });
    }));
    // eslint-disable-next-line
  }, [tetromino.matrix, tetromino.position]);

  useDidUpdate(() => {
    if (detectCollision(move.isRotation ? tetromino.getCloned().rotate() : move)) {
      if (!move.isDown) return;

      const filledRowsAddresses = display.reduce((acc, row, rowAddress) => {
        !some(row, 'isEmpty') && acc.push(rowAddress);

        return acc;
      }, []);

      if (filledRowsAddresses.length) {
        setMergedDisplay(produce(display, draft => {
          filledRowsAddresses.forEach(address => {
            draft.splice(address, 1);
            draft.unshift(emptyRow);
          });
        }));
        setSweptRowsCount(count => count + filledRowsAddresses.length);
      } else setMergedDisplay(display);
    } else makeMove(move);
  }, move);

  useDidUpdate(() => {
    randomize();
  }, mergedDisplay);

  useDidUpdate(() => {
    if (detectCollision()) {
      setDisplay(emptyDisplay);
      setMergedDisplay(emptyDisplay);
      setSweptRowsCount(0);
    }
  }, tetromino.id);

  return { display, sweptRowsCount };
};
