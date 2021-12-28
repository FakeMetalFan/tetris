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
  tiles.reduce((acc: number[], row, index) => {
    const isFilled = !row.some(isTileEmpty);

    if (isFilled) {
      acc.push(index);
    }

    return acc;
  }, []);

export const getRandomTetromino = () => {
  const randomIndex = Math.floor(Math.random() * TETROMINOS.length);

  return TETROMINOS[randomIndex];
};

export const isNoFill = (fill: TILE_FILL) => fill === TILE_FILL.NONE;

export const isTileEmpty = ({
  fill,
}: Tile) => isNoFill(fill);

export const isTileMerged = ({
  merged,
}: Tile) => Boolean(merged);
