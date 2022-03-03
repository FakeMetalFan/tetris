import produce from 'immer';

import {
  assign,
  each,
  floor,
  flow,
  head,
  map,
  omit,
  partial,
  partialRight,
  reverse,
  sample,
  size,
  toArray,
} from 'lodash-es';

import TILE_FILL from 'constants/tile-fill';

import makeUnique from 'utils/make-unique';

import {
  TETROMINOES,
} from './constants';

import {
  getFilledRowsIndexes,
} from './utils';

const randomizeTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    draft.tetromino = sample(TETROMINOES)!;
  });

const initPoint = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      width,
      tetromino,
    } = draft;

    draft.point = {
      x: 0,
      y: floor((width - size(tetromino)) / 2),
    };
  });

const draw = (state: Tetris) =>
  produce(state, ({
    tetromino,
    point,
    tiles,
  }) => {
    each(tetromino, (row, x) => {
      each(row, (fill, y) => {
        if (fill) {
          const tile = tiles[point.x + x][point.y + y];

          if (tile.merged) {
            throw 'Cannot draw over a merged tile';
          }

          tile.fill = fill;
        }
      });
    });
  });

const initTile = () =>
  makeUnique({
    fill: TILE_FILL.NONE,
    merged: false,
  });

const mergeTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    each(draft.tiles, (row) => {
      each(row, (tile) => {
        tile.merged = tile.fill !== TILE_FILL.NONE;
      });
    });
  });

const updateScore = (state: Tetris) =>
  produce(state, (draft) => {
    draft.score += size(getFilledRowsIndexes(draft));
  });

const clearFilledRows = (state: Tetris) =>
  produce(state, ({
    tiles,
  }) => {
    each(getFilledRowsIndexes(state), (index) => {
      for (let x = index; x; --x) {
        each(tiles[x], (tile, y) => {
          assign(tile, omit(tiles[x - 1][y], 'id'));
        });
      }
    });
  });

const initTetromino = (state: Tetris) =>
  flow(
    randomizeTetromino,
    initPoint,
    draw,
  )(state);

const initField = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      height,
      width,
    } = draft;

    draft.tiles = map(
      toArray({
        length: height,
      }),
      () => map(
        toArray({
          length: width,
        }),
        initTile,
      ),
    );
  });

const clearField = (state: Tetris, overrideMerge?: boolean) =>
  produce(state, (draft) => {
    each(draft.tiles, (row) => {
      each(row, (tile) => {
        if (overrideMerge) {
          tile.merged = false;
        }

        if (!tile.merged) {
          tile.fill = TILE_FILL.NONE;
        }
      });
    });
  });

const patchPoint = ({
  x = 0,
  y = 0,
}: Partial<Point>, state: Tetris) =>
  produce(state, ({
    point,
  }) => {
    point.x += x;
    point.y += y;
  });

const rotateTetromino = (state: Tetris) =>
  produce(state, (draft) => {
    const {
      tetromino,
    } = draft;

    draft.tetromino = map(head(tetromino), (_, index) =>
      reverse(map(tetromino, (row) => row[index])),
    );
  });

const finish = (state: Tetris) =>
  flow(
    mergeTetromino,
    updateScore,
    clearFilledRows,
    initTetromino,
  )(state);

const initState = (width: number, height: number) =>
  flow(
    initField,
    initTetromino,
  )(
    {
      width,
      height,
      score: 0,
    } as Tetris,
  );

const move = (offset: Partial<Point>, state: Tetris) =>
  flow(
    clearField,
    partial(patchPoint, offset),
    draw,
  )(state);

const reset = (state: Tetris) =>
  flow(
    partialRight(clearField, true),
    initTetromino,
  )(
    {
      ...state,
      score: 0,
    },
  );

const rotate = (state: Tetris) =>
  flow(
    clearField,
    rotateTetromino,
    draw,
  )(state);

const setFast = (value: boolean, state: Tetris) =>
  produce(state, (draft) => {
    draft.fast = value;
  });

export default {
  finish,
  initState,
  move,
  reset,
  rotate,
  setFast,
};
