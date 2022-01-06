import produce from 'immer';

import {
  flow,
  partial,
  partialRight,
} from 'lodash-es';

import {
  useState,
} from 'react';

import {
  POINT_OFFSET,
} from './constants';

import {
  clearField,
  clearFilledRows,
  drawTetromino,
  initState,
  initTetromino,
  mergeTetromino,
  patchPoint,
  rotateTetromino,
  updateScore,
} from './state-producers';

import {
  catchErr,
} from './utils';

export default (width: number, height: number) => {
  const [
    state,
    setState,
  ] = useState(() => initState(width, height));

  const move = (offset: Partial<Point>) => {
    setState(
      flow(
        clearField,
        partial(patchPoint, offset),
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
      flow(
        mergeTetromino,
        updateScore,
        clearFilledRows,
        initTetromino,
      )(state),
    );
  };

  const reset = () => {
    setState(
      flow(
        partialRight(clearField, true),
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
    move(POINT_OFFSET.LEFT);
  });

  const right = catchErr(() => {
    move(POINT_OFFSET.RIGHT);
  });

  const rotate = catchErr(() => {
    setState(
      flow(
        clearField,
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
      move(POINT_OFFSET.BOTTOM);
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
