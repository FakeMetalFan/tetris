import React, { useEffect, useRef, useState } from 'react';

import { useDisplay, useDidUpdate, useInterval } from 'hooks';

import { keyCode } from 'const';

import { LeftMove, RotationMove, RightMove, DownMove } from 'view-models';

import { Display } from '..';

import './Tetris.scss';

export const Tetris = ({ width, height }) => {
  const [state, setState] = useState({ score: 0, move: null, isAutoDrop: true });

  const { score, move, isAutoDrop } = state;

  const { state: displayState, sweptRowsCount } = useDisplay({ width, height, move });

  const container = useRef();

  const drop = () => {
    setState(prevState => ({ ...prevState, move: new DownMove })); // should be lazy, race condition;
  };

  const handleKeyDown = ({ keyCode: code }) => {
    code === keyCode.ArrowLeft && setState({ ...state, move: new LeftMove });
    code === keyCode.ArrowUp && setState({ ...state, move: new RotationMove });
    code === keyCode.ArrowRight && setState({ ...state, move: new RightMove });

    if (code === keyCode.ArrowDown) {
      setState({ ...state, isAutoDrop: false });
      drop();
    }
  };

  const handleKeyUp = ({ keyCode: code }) => {
    code === keyCode.ArrowDown && setState({ ...state, isAutoDrop: true });
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  useDidUpdate(() => {
    setState({ ...state, score: sweptRowsCount ? score + sweptRowsCount * 10 : 0 });
  }, sweptRowsCount);

  useInterval(() => {
    drop();
  }, isAutoDrop ? 800 : null);

  return <div className='tetris' tabIndex='0' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={container}>
    <div className='score'>{score}</div>
    <Display state={displayState} width={width} />
  </div>;
};
