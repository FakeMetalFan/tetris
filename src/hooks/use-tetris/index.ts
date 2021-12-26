import { useState } from 'react';

import {
  init, move, catchErr, reset, rotate as rot, setFast, finish,
} from './utils';

export default (width: number, height: number) => {
  const [state, setState] = useState(() => init(width, height));

  const handleCollision = () => {
    try {
      setState(finish(state));
    } catch {
      setState(reset(state));
    }
  };

  const left = catchErr(() => {
    setState(move(state, { y: -1 }));
  });

  const right = catchErr(() => {
    setState(move(state, { y: 1 }));
  });

  const rotate = catchErr(() => {
    setState(rot(state));
  });

  const accelerate = () => {
    setState(setFast(state, true));
  };

  const decelerate = () => {
    setState(setFast(state, false));
  };

  const drop = () => {
    try {
      setState(move(state, { x: 1 }));
    } catch {
      handleCollision();
    }
  };

  return { ...state, left, right, rotate, accelerate, decelerate, drop };
};
