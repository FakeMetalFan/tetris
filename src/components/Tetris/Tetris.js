import React, { useEffect, useRef, useReducer } from 'react';

import produce from 'immer';

import { useDisplay, useDidUpdate, useInterval } from 'hooks';

import { keyCode as code } from 'const';

import { LeftMove, Rotation, RightMove, DownMove } from 'view-models';

import { Display } from '..';

import './Tetris.scss';

const actionType = {
  LeftMove: 'left-move',
  Rotation: 'rotation',
  RightMove: 'right-move',
  DownMove: 'down-move',
  EnableAutoDrop: 'enable-auto-drop',
  UpdateScore: 'update-score',
  AutoDrop: 'auto-drop',
};

const reducer = (state, { type, payload }) => produce(state, draft => {
  switch (type) {
    case actionType.LeftMove:
      draft.move = new LeftMove;

      break;
    case actionType.Rotation:
      draft.move = new Rotation;

      break;
    case actionType.RightMove:
      draft.move = new RightMove;

      break;
    case actionType.DownMove:
      draft.isAutoDrop = false;
      draft.move = new DownMove;

      break;
    case actionType.EnableAutoDrop:
      draft.isAutoDrop = true;

      break;
    case actionType.UpdateScore:
      const { sweptRowsCount } = payload;

      draft.score = sweptRowsCount ? draft.score + sweptRowsCount * 10 : 0;

      break;
    case actionType.AutoDrop:
      draft.move = new DownMove;
  }
});

export const Tetris = ({ width, height }) => {
  const [{ score, move, isAutoDrop }, dispatch] = useReducer(reducer, { score: 0, move: null, isAutoDrop: true });
  const { state: displayState, sweptRowsCount } = useDisplay({ width, height, move });
  const container = useRef();

  const handleKeyDown = ({ keyCode }) => {
    keyCode === code.ArrowLeft && dispatch({ type: actionType.LeftMove });
    keyCode === code.ArrowUp && dispatch({ type: actionType.Rotation });
    keyCode === code.ArrowRight && dispatch({ type: actionType.RightMove });
    keyCode === code.ArrowDown && dispatch({ type: actionType.DownMove });
  };

  const handleKeyUp = ({ keyCode }) => {
    keyCode === code.ArrowDown && dispatch({ type: actionType.EnableAutoDrop });
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  useDidUpdate(() => {
    dispatch({ type: actionType.UpdateScore, payload: { sweptRowsCount } });
  }, sweptRowsCount);

  useInterval(() => {
    dispatch({ type: actionType.AutoDrop });
  }, isAutoDrop ? 800 : null);

  return <div className='tetris' tabIndex='0' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={container}>
    <div className='score'>{score}</div>
    <Display state={displayState} width={width} />
  </div>;
};
