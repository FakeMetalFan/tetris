import {
  useState,
} from 'react';

import {
  POINT_OFFSET,
} from './constants';

import {
  finish,
  initState,
  move,
  reset,
  rotate as rot,
  setFast,
} from './state-producers';

import {
  catchErr,
} from './utils';

export default (width: number, height: number) => {
  const [
    state,
    setState,
  ] = useState(() => initState(width, height));

  const handleBottomCollision = () => {
    try {
      setState(finish(state));
    } catch {
      setState(reset(state));
    }
  };

  const left = catchErr(() => {
    setState(move(POINT_OFFSET.LEFT, state));
  });

  const right = catchErr(() => {
    setState(move(POINT_OFFSET.RIGHT, state));
  });

  const rotate = catchErr(() => {
    setState(rot(state));
  });

  const accelerate = () => {
    setState(setFast(true, state));
  };

  const decelerate = () => {
    setState(setFast(false, state));
  };

  const drop = () => {
    try {
      setState(move(POINT_OFFSET.BOTTOM, state));
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
