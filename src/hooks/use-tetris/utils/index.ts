import produce from 'immer';

import TILE_FILL from 'constants/tile-fill';

import compose from 'utils/compose';
import makeUnique from 'utils/make-unique';
import rotateMatrix from 'utils/rotate-matrix';

import { TETROMINOS } from '../constants';

const initTiles = (state: Tetris) =>
  produce(state, (d) => {
    const { height, width } = d;

    d.tiles = Array.from({ length: height }, () =>
      Array.from({ length: width }, () =>
        makeUnique({ fill: TILE_FILL.NONE }),
      ),
    );
  });

const randomizeTetromino = (state: Tetris) =>
  produce(state, (d) => {
    d.tetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
  });

const initPoint = (state: Tetris) =>
  produce(state, (d) => {
    const { width, tetromino } = d;

    d.point = { x: 0, y: Math.floor((width - tetromino.length) / 2) };
  });

const draw = (state: Tetris) =>
  produce(state, ({ tetromino, point, tiles }) => {
    tetromino.forEach((row, x) => {
      row.forEach((fill, y) => {
        if (fill === TILE_FILL.NONE) {
          return;
        }

        const tile = tiles[point.x + x][point.y + y];

        if (tile.merged) {
          throw 'Cannot draw over a merged tile';
        }

        tile.fill = fill;
      });
    });
  });

const initTetromino = (state: Tetris) =>
  compose(randomizeTetromino, initPoint, draw)(state);

const clear = (state: Tetris, overrideMerge?: boolean) =>
  produce(state, ({ tiles }) => {
    tiles.forEach((row) => {
      row.forEach((tile) => {
        overrideMerge && (delete tile.merged);
        tile.merged || (tile.fill = TILE_FILL.NONE);
      });
    });
  });

const patchPoint = (state: Tetris, { x = 0, y = 0 }: Partial<Point>) =>
  produce(state, ({ point }) => {
    point.x += x;
    point.y += y;
  });

const rotateTetromino = (state: Tetris) =>
  produce(state, (d) => {
    d.tetromino = rotateMatrix(d.tetromino);
  });

const merge = (state: Tetris) =>
  produce(state, (d) => {
    d.tiles.forEach((row) => {
      row.forEach((tile) => {
        tile.merged = tile.fill !== TILE_FILL.NONE;
      });
    });
  });

const handleFilledRows = (state: Tetris) =>
  produce(state, (d) => {
    const { tiles } = d;
    const indexes = tiles.reduce((acc: number[], row, index) => {
      !row.some(({ fill }) => fill === TILE_FILL.NONE) && acc.push(index);

      return acc;
    }, []);

    d.score += indexes.length * 10;
    indexes.forEach((index) => {
      for (let x = index; x; --x) {
        tiles[x].forEach((tile, y) => {
          const { fill, merged } = tiles[x - 1][y];

          tile.fill = fill;
          tile.merged = merged;
        });
      }
    });
  });

export const init = (width: number, height: number): Tetris =>
  compose(initTiles, initTetromino)({ width, height, score: 0 });

export const catchErr = (cb: () => void) =>
  () => {
    try {
      cb();
    } catch {}
  };

export const move = (state: Tetris, offset: Partial<Point>) =>
  compose(clear, (next) => patchPoint(next, offset), draw)(state);

export const rotate = (state: Tetris) =>
  compose(clear, rotateTetromino, draw)(state);

export const setFast = (state: Tetris, fast: boolean) =>
  produce(state, (d) => {
    d.fast = fast;
  });

export const finish = (state: Tetris) =>
  compose(merge, handleFilledRows, initTetromino)(state);

export const reset = (state: Tetris) =>
  compose((next) => clear(next, true), initTetromino)({ ...state, score: 0 });
