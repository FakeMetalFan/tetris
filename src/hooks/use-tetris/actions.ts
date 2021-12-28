import produce from 'immer';

import compose from 'utils/compose';

import {
  clearFilledRows,
  clearTiles,
  drawTetromino,
  initPoint,
  initTiles,
  mergeTetromino,
  patchPoint,
  randomizeTetromino,
  rotateTetromino,
  updateScore,
} from './producers';

const _initTetromino = (state: Tetris) =>
  compose(
    randomizeTetromino,
    initPoint,
    drawTetromino,
  )(state);

export const catchErr = (callback: () => void) =>
  () => {
    try {
      callback();
    } catch {}
  };

export const finish = (state: Tetris) =>
  compose(
    mergeTetromino,
    updateScore,
    clearFilledRows,
    _initTetromino,
  )(state);

export const init = (width: number, height: number): Tetris =>
  compose(
    initTiles,
    _initTetromino,
  )({
    width,
    height,
    score: 0,
  });

export const move = (state: Tetris, offset: Partial<Point>) =>
  compose(
    clearTiles,
    (next) => patchPoint(next, offset),
    drawTetromino,
  )(state);

export const reset = (state: Tetris) =>
  compose(
    (next) => clearTiles(next, true),
    _initTetromino,
  )({
    ...state,
    score: 0,
  });

export const rotate = (state: Tetris) =>
  compose(
    clearTiles,
    rotateTetromino,
    drawTetromino,
  )(state);

export const setFast = (state: Tetris, fast: boolean) =>
  produce(state, (draft) => {
    draft.fast = fast;
  });
