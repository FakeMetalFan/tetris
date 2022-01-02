import TILE_FILL from 'constants/tile-fill';

import {
  TETROMINOS,
} from './constants';

export const catchErr = (callback: () => void) =>
  () => {
    try {
      callback();
    } catch {}
  };

export const getFilledRowsIndexes = ({
  tiles,
}: Tetris) =>
  tiles.reduce((acc: number[], row, x) => {
    const isFilled = !row.some(({ fill }) => fill === TILE_FILL.NONE);

    if (isFilled) {
      acc.push(x);
    }

    return acc;
  }, []);

export const getRandomTetromino = () =>
  TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
