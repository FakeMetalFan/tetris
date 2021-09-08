import tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import produce from 'immer';
import { useState } from 'react';
import rotateMatrix from 'utils/rotateMatrix';

const useTetromino = ({ width }: TetrisProps) => {
  const [tetromino, setTetromino] = useState<(TileFill | undefined)[][]>([]);

  const [position, setPosition] = useState({ rowIndex: 0, columnIndex: 0 });

  const randomize = () => {
    const randomTetromino =
      tetrominos[Math.floor(Math.random() * tetrominos.length)];

    setTetromino(randomTetromino);
    setPosition({
      rowIndex: 0,
      columnIndex: Math.floor((width - randomTetromino.length) / 2),
    });
  };

  const makeMove = ({
    isRotation,
    offset = { rowIndex: 0, columnIndex: 0 },
  }: Move) => {
    if (isRotation) {
      setTetromino(rotateMatrix(tetromino));
    } else {
      setPosition(
        produce(position, (draft) => {
          /* eslint-disable no-param-reassign */
          draft.rowIndex += offset.rowIndex;
          draft.columnIndex += offset.columnIndex;
        })
      );
    }
  };

  return { tetromino, position, randomize, makeMove };
};

export default useTetromino;
