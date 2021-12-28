import produce from 'immer';

import TILE_FILL from 'constants/tile-fill';

import compose from 'utils/compose';
import makeUnique from 'utils/make-unique';
import rotateMatrix from 'utils/rotate-matrix';

import {
  getFilledRowsIndexes,
  getRandomTetromino,
  isNoFill,
  isTileEmpty,
  isTileMerged,
} from './utils';

const initPoint = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      width,
      tetromino,
    } = draft;

    draft.point = {
      x: 0,
      y: Math.floor((width - tetromino.length) / 2),
    };
  });

const initTiles = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      height,
      width,
    } = draft;

    draft.tiles = Array.from(
      {
        length: height,
      },
      () => Array.from(
        {
          length: width,
        },
        () => makeUnique({
          fill: TILE_FILL.NONE,
        }),
      ),
    );
  });

const randomizeTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    draft.tetromino = getRandomTetromino();
  });

export const clearFilledRows = (state: Tetris) =>
  produce(state, ({
    tiles,
  }) => {
    getFilledRowsIndexes(state).forEach((index) => {
      for (let x = index; x; --x) {
        const row = tiles[x];

        row.forEach((tile, y) => {
          const {
            fill,
            merged,
          } = tiles[x - 1][y];

          tile.fill = fill;
          tile.merged = merged;
        });
      }
    });
  });

export const clearTiles = (state: Tetris, overrideMerge?: boolean) =>
  produce(state, ({
    tiles,
  }) => {
    tiles.forEach((row) => {
      row.forEach((tile) => {
        if (overrideMerge) {
          delete tile.merged;
        }

        if (isTileMerged(tile)) {
          return;
        }

        tile.fill = TILE_FILL.NONE;
      });
    });
  });

export const drawTetromino = (state: Tetris) =>
  produce(state, ({
    tetromino,
    point,
    tiles,
  }) => {
    tetromino.forEach((row, x) => {
      row.forEach((fill, y) => {
        if (isNoFill(fill)) {
          return;
        }

        const tile = tiles[point.x + x][point.y + y];

        if (isTileMerged(tile)) {
          throw 'Cannot draw over a merged tile';
        }

        tile.fill = fill;
      });
    });
  });

export const initState = (width: number, height: number): Tetris =>
  compose(
    initTiles,
    initTetromino,
  )({
    width,
    height,
    score: 0,
  });

export const initTetromino = (state: Tetris) =>
  compose(
    randomizeTetromino,
    initPoint,
    drawTetromino,
  )(state);

export const mergeTetromino = (state: Tetris) =>
  produce(state, ({
    tiles,
  }) => {
    tiles.forEach((row) => {
      row.forEach((tile) => {
        if (isTileMerged(tile) || isTileEmpty(tile)) {
          return;
        }

        tile.merged = true;
      });
    });
  });

export const patchPoint = (state: Tetris, {
  x = 0,
  y = 0,
}: Partial<Point>) =>
  produce(state, ({
    point,
  }) => {
    point.x += x;
    point.y += y;
  });

export const rotateTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    draft.tetromino = rotateMatrix(draft.tetromino);
  });

export const updateScore = (state: Tetris) =>
  produce(state, (draft) => {
    draft.score += getFilledRowsIndexes(draft).length;
  });
