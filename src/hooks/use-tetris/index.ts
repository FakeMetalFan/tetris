import produce from 'immer';

import {
  useState,
} from 'react';

import compose from 'utils/compose';

import {
  clearFilledRows,
  clearTiles,
  drawTetromino,
  initState,
  initTetromino,
  mergeTetromino,
  patchPoint,
  rotateTetromino,
  updateScore,
} from './state-producers';

import { catchErr } from './utils';

export default (width: number, height: number) => {
  const [
    state,
    setState,
  ] = useState(() => initState(width, height));

  const move = (offset: Partial<Point>) => {
    setState(
      compose(
        clearTiles,
        (next) => patchPoint(next, offset),
        drawTetromino,
      )(state),
    );
  };

  const setFast = (fast: boolean) => {
    setState(
      produce(state, (draft) => {
        draft.fast = fast;
      }),
    );
  };

  const finish = () => {
    setState(
      compose(
        mergeTetromino,
        updateScore,
        clearFilledRows,
        initTetromino,
      )(state),
    );
  };

  const reset = () => {
    setState(
      compose(
        (next) => clearTiles(next, true),
        initTetromino,
      )({
        ...state,
        score: 0,
      }),
    );
  };

  const handleBottomCollision = () => {
    try {
      finish();
    } catch {
      reset();
    }
  };

  const left = catchErr(() => {
    move({
      y: -1,
    });
  });

  const right = catchErr(() => {
    move({
      y: 1,
    });
  });

  const rotate = catchErr(() => {
    setState(
      compose(
        clearTiles,
        rotateTetromino,
        drawTetromino,
      )(state),
    );
  });

  const accelerate = () => {
    setFast(true);
  };

  const decelerate = () => {
    setFast(false);
  };

  const drop = () => {
    try {
      move({
        x: 1,
      });
    } catch {
      handleBottomCollision();
    }
  };

  return {
    ...state,
    left,
    right,
    rotate,
    accelerate,
    decelerate,
    drop,
  };
};
