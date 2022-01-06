import produce from 'immer';

import {
  flow,
} from 'lodash-es';

import TILE_FILL from 'constants/tile-fill';

import makeUnique from 'utils/make-unique';

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
    draft.tetromino =
      TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  });

export const clearField = (state: Tetris, overrideMerge?: boolean) =>
  produce(state, (draft) => {
    draft.field.forEach((row) => {
      row.forEach((tile) => {
        if (overrideMerge) {
          tile.merged = false;
        }

        if (!tile.merged) {
          tile.fill = TILE_FILL.NONE;
        }
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
          const {
            id,
            ...rest
          } = field[x - 1][y];

          Object.assign(tile, rest);
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
        if (fill) {
          const tile = field[point.x + x][point.y + y];

          if (tile.merged) {
            throw 'Cannot draw over a merged tile';
          }

          tile.fill = fill;
        }
      });
    });
  });

export const initState = (width: number, height: number) =>
  flow(
    initField,
    initTetromino,
  )({
    width,
    height,
    score: 0,
  } as Tetris);

export const initTetromino = (state: Tetris) =>
  flow(
    randomizeTetromino,
    initPoint,
    drawTetromino,
  )(state);

export const mergeTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    draft.field.forEach((row) => {
      row.forEach((tile) => {
        tile.merged = tile.fill !== TILE_FILL.NONE;
      });
    });
  });

export const patchPoint = ({
  x = 0,
  y = 0,
}: Partial<Point>, state: Tetris) =>
  produce(state, ({
    point,
  }) => {
    point.x += x;
    point.y += y;
  });

export const rotateTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      tetromino,
    } = draft;

    draft.tetromino = tetromino[0].map((_, index) =>
      tetromino
        .map((row) => row[index])
        .reverse(),
    );
  });

export const updateScore = (state: Tetris) =>
  produce(state, (draft) => {
    draft.score += getFilledRowsIndexes(draft).length;
  });
