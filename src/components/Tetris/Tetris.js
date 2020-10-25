import React, { useEffect, useRef, useState } from 'react';

import { useDisplay, useDidUpdate, useInterval } from 'hooks';

import { keyCode as code } from 'const';

import { LeftMove, RotationMove, RightMove, DownMove } from 'view-models';

import { Display } from '..';

import './Tetris.scss';

export const Tetris = ({ width, height }) => {
  const [state, setState] = useState({ score: 0, move: null, isAutoDrop: true });

  const { score, move, isAutoDrop } = state;

  const { state: displayState, sweptRowsCount } = useDisplay({ width, height, move });

  const container = useRef();

  const handleKeyDown = ({ keyCode }) => {
    keyCode === code.ArrowLeft && setState({ ...state, move: new LeftMove });
    keyCode === code.ArrowUp && setState({ ...state, move: new RotationMove });
    keyCode === code.ArrowRight && setState({ ...state, move: new RightMove });
    keyCode === code.ArrowDown && setState({ ...state, move: new DownMove, isAutoDrop: false });
  };

  const handleKeyUp = ({ keyCode }) => {
    keyCode === code.ArrowDown && setState({ ...state, isAutoDrop: true });
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  useDidUpdate(() => {
    setState({ ...state, score: sweptRowsCount ? score + sweptRowsCount * 10 : 0 });
  }, sweptRowsCount);

  useInterval(() => {
    setState({ ...state, move: new DownMove });
  }, isAutoDrop ? 800 : null);

  return <div className='tetris' tabIndex='0' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={container}>
    <div className='score'>{score}</div>
    <Display state={displayState} width={width} />
  </div>;
};
