import React, { useEffect, useRef, useState } from 'react';

import { useTetris, useDidUpdate, useInterval } from 'hooks';

import { keyCode } from 'const';

import { LeftMove, RotationMove, RightMove, DownMove } from 'view-models';

import { Display } from '..';

import './Tetris.scss';

export const Tetris = () => {
  const width = 10;

  const [score, setScore] = useState(0);
  const [move, setMove] = useState(null);
  const [isAutoDrop, setIsAutoDrop] = useState(true);

  const { state, sweptRowsCount } = useTetris({ width, move, height: 20 });

  const container = useRef();

  const drop = () => {
    setMove(new DownMove);
  };

  const handleKeyDown = ({ keyCode: code }) => {
    code === keyCode.ArrowLeft && setMove(new LeftMove);
    code === keyCode.ArrowUp && setMove(new RotationMove);
    code === keyCode.ArrowRight && setMove(new RightMove);

    if (code === keyCode.ArrowDown) {
      setIsAutoDrop(false);
      drop();
    }
  };

  const handleKeyUp = ({ keyCode: code }) => {
    code === keyCode.ArrowDown && setIsAutoDrop(true);
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  useDidUpdate(() => {
    setScore(prevScore => sweptRowsCount ? prevScore + sweptRowsCount * 10 : 0);
  }, sweptRowsCount);

  useInterval(() => {
    drop();
  }, isAutoDrop ? 800 : null);

  return <div className='tetris' tabIndex='0' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={container}>
    <div className='score'>{score}</div>
    <Display state={state} width={width} />
  </div>;
};
