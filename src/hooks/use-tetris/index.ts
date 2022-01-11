import {
  useState,
} from 'react';

import {
  POINT_OFFSET,
} from './constants';

import stateProducers from './state-producers';

import {
  catchErr,
} from './utils';

export default (width: number, height: number) => {
  const [
    state,
    setState,
  ] = useState(() =>
    stateProducers.initState(width, height),
  );

  const handleBottomCollision = () => {
    try {
      setState(stateProducers.finish(state));
    } catch {
      setState(stateProducers.reset(state));
    }
  };

  const left = catchErr(() => {
    setState(stateProducers.move(POINT_OFFSET.LEFT, state));
  });

  const right = catchErr(() => {
    setState(stateProducers.move(POINT_OFFSET.RIGHT, state));
  });

  const rotate = catchErr(() => {
    setState(stateProducers.rotate(state));
  });

  const accelerate = () => {
    setState(stateProducers.setFast(true, state));
  };

  const decelerate = () => {
    setState(stateProducers.setFast(false, state));
  };

  const drop = () => {
    try {
      setState(stateProducers.move(POINT_OFFSET.BOTTOM, state));
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
