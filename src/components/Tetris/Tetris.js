import React, { useEffect, useRef, useState } from 'react';

import { useDidUpdate, useDisplay, useInterval, useTetromino } from 'hooks';

import { keyCode, tetrominoMove } from 'const';

import { getRotatedMatrix } from 'utils';

import { Display } from '..';

import './Tetris.scss';

export const Tetris = () => {
  const width = 10;
  const height = 20;

  const delay = 800;

  const [intervalDelay, setIntervalDelay] = useState(null);
  const [score, setScore] = useState(0);

  const { state: tetromino, position, randomize, move, rotate } = useTetromino({ width });

  const { state, sweptRowsCount, willCollide, merge } = useDisplay({ width, height, tetromino, position, randomize });

  const container = useRef();

  const drop = () => {
    if (willCollide(tetrominoMove.Down)) merge();
    else move(tetrominoMove.Down);
  };

  const handleKeyDown = ({ keyCode: code }) => {
    code === keyCode.ArrowLeft && !willCollide(tetrominoMove.Left) && move(tetrominoMove.Left);
    code === keyCode.ArrowUp && !willCollide({ piece: getRotatedMatrix(tetromino) }) && rotate();
    code === keyCode.ArrowRight && !willCollide(tetrominoMove.Right) && move(tetrominoMove.Right);

    if (code === keyCode.ArrowDown) {
      setIntervalDelay(null);
      drop();
    }
  };

  const handleKeyUp = ({ keyCode: code }) => {
    code === keyCode.ArrowDown && setIntervalDelay(delay);
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  useDidUpdate(() => {
    setScore(prevScore => sweptRowsCount ? prevScore + sweptRowsCount * 10 : 0);
  }, sweptRowsCount);

  useDidUpdate(() => {
    !intervalDelay && setIntervalDelay(delay);
  }, tetromino, position);

  useInterval(() => {
    drop();
  }, intervalDelay);

  return (
    <div className='tetris' tabIndex='0' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={container}>
      <div className='score'>{score}</div>
      <Display state={state} columnsCount={width} />
    </div>
  );
};
