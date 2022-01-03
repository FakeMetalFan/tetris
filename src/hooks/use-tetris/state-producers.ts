import produce from 'immer';

import TILE_FILL from 'constants/tile-fill';

import compose from 'utils/compose';
import getRandomArrItem from 'utils/get-random-arr-item';
import makeUnique from 'utils/make-unique';
import omit from 'utils/omit';
import rotateMatrix from 'utils/rotate-matrix';

import {
  TETROMINOES,
} from './constants';

import {
  getFilledRowsIndexes,
} from './utils';

const initTile = () =>
  makeUnique({
    fill: TILE_FILL.NONE,
    merged: false,
  });

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

const initField = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      height,
      width,
    } = draft;

    draft.field = Array.from(
      {
        length: height,
      },
      () => Array.from(
        {
          length: width,
        },
        initTile,
      ),
    );
  });

const randomizeTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    draft.tetromino = getRandomArrItem(TETROMINOES);
  });

export const clearField = (state: Tetris, overrideMerge?: boolean) =>
  produce(state, ({
    field,
  }) => {
    field.forEach((row) => {
      row.forEach((tile) => {
        if (overrideMerge) {
          tile.merged = false;
        }

        if (tile.merged) {
          return;
        }

        tile.fill = TILE_FILL.NONE;
      });
    });
  });

export const clearFilledRows = (state: Tetris) =>
  produce(state, ({
    field,
  }) => {
    getFilledRowsIndexes(state).forEach((index) => {
      for (let x = index; x; --x) {
        field[x].forEach((tile, y) => {
          Object.assign(tile, omit(field[x - 1][y], 'id'));
        });
      }
    });
  });

export const drawTetromino = (state: Tetris) =>
  produce(state, ({
    tetromino,
    point,
    field,
  }) => {
    tetromino.forEach((row, x) => {
      row.forEach((fill, y) => {
        if (!fill) {
          return;
        }

        const tile = field[point.x + x][point.y + y];

        if (tile.merged) {
          throw 'Cannot draw over a merged tile';
        }

        tile.fill = fill;
      });
    });
  });

export const initState = (width: number, height: number): Tetris =>
  compose(
    initField,
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
    field,
  }) => {
    field.forEach((row) => {
      row.forEach((tile) => {
        tile.merged = tile.fill !== TILE_FILL.NONE;
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
