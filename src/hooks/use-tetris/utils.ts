import TILE_FILL from 'constants/tile-fill';

import makeUnique from 'utils/make-unique';

import {
  TETROMINOS,
} from './constants';

export const catchErr = (callback: () => void) =>
  () => {
    try {
      callback();
    } catch {}
  };

export const createEmptyTile = () =>
  makeUnique({
    fill: TILE_FILL.NONE,
    merged: false,
  });

export const getFilledRowsIndexes = ({
  tiles,
}: Tetris) =>
  tiles.reduce((acc: number[], row, index) => {
    const isFilled = !row.some(({ fill }) => fill === TILE_FILL.NONE);

    if (isFilled) {
      acc.push(index);
    }

    return acc;
  }, []);

export const getRandomTetromino = () =>
  TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
