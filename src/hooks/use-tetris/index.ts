import {
  useState,
} from 'react';

import {
  catchErr,
  finish,
  init,
  move,
  reset,
  rotate as _rotate,
  setFast,
} from './actions';

import {
  MOVE_OFFSET,
} from './constants';

export default (width: number, height: number) => {
  const [
    state,
    setState,
  ] = useState(() => init(width, height));

  const _handleCollision = () => {
    try {
      setState(finish(state));
    } catch {
      setState(reset(state));
    }
  };

  const left = catchErr(() => {
    setState(move(state, MOVE_OFFSET.LEFT));
  });

  const right = catchErr(() => {
    setState(move(state, MOVE_OFFSET.RIGHT));
  });

  const rotate = catchErr(() => {
    setState(_rotate(state));
  });

  const accelerate = () => {
    setState(setFast(state, true));
  };

  const decelerate = () => {
    setState(setFast(state, false));
  };

  const drop = () => {
    try {
      setState(move(state, MOVE_OFFSET.BOTTOM));
    } catch {
      _handleCollision();
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
