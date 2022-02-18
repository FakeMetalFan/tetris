import {
  partial,
} from 'lodash-es';

import {
  useReducer,
} from 'react';

import {
  POINT_OFFSET,
} from './constants';

import stateProducers from './state-producers';

enum ActionType {
  Left,
  Right,
  Rotate,
  Accelerate,
  Decelerate,
  Drop,
}

type Action = {
  type: ActionType;
};

type SetStateCallback = (state: Tetris) => Tetris;

const reducer = (state: Tetris, action: Action) => {
  const catchErr = (
    callback: SetStateCallback,
    catchCallback?: SetStateCallback,
  ) => {
    try {
      return callback(state);
    } catch {
      return catchCallback?.(state) ?? state;
    }
  };

  switch (action.type) {
    case ActionType.Left:
      return catchErr(partial(stateProducers.move, POINT_OFFSET.LEFT));
    case ActionType.Right:
      return catchErr(partial(stateProducers.move, POINT_OFFSET.RIGHT));
    case ActionType.Rotate:
      return catchErr(stateProducers.rotate);
    case ActionType.Accelerate:
      return stateProducers.setFast(true, state);
    case ActionType.Decelerate:
      return stateProducers.setFast(false, state);
    case ActionType.Drop:
      return catchErr(
        partial(stateProducers.move, POINT_OFFSET.BOTTOM),
        () => catchErr(stateProducers.finish, stateProducers.reset),
      );
    default:
      throw 'Appropriate action must be dispatched';
  }
};

export default (width: number, height: number) => {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    undefined,
    () => stateProducers.initState(width, height),
  );

  const left = () => {
    dispatch({
      type: ActionType.Left,
    });
  };

  const right = () => {
    dispatch({
      type: ActionType.Right,
    });
  };

  const rotate = () => {
    dispatch({
      type: ActionType.Rotate,
    });
  };

  const accelerate = () => {
    dispatch({
      type: ActionType.Accelerate,
    });
  };

  const decelerate = () => {
    dispatch({
      type: ActionType.Decelerate,
    });
  };

  const drop = () => {
    dispatch({
      type: ActionType.Drop,
    });
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
