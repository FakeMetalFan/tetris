import TileFill from 'constants/tileFill';
import produce from 'immer';
import { useEffect, useMemo, useState } from 'react';
import addId from 'utils/addId';
import createMove from 'utils/createMove';
import rotateMatrix from 'utils/rotateMatrix';

import useDidUpdate from './useDidUpdate';
import useInterval from './useInterval';
import useTetromino from './useTetromino';

const useTetris = (params: TetrisParams) => {
  const { width, height } = params;

  const emptyTiles = useMemo(
    () =>
      Array.from({ length: height }, () =>
        Array.from({ length: width }, () => addId({} as { fill?: TileFill }))
      ),
    [height, width]
  );

  const [tiles, setTiles] = useState(emptyTiles);

  const [mergedTiles, setMergedTiles] = useState(emptyTiles);

  const [clearedRowsCount, setClearedRowsCount] = useState(0);

  const [score, setScore] = useState(0);

  const [move, setMove] = useState<Move>({});

  const [isAutoDrop, setIsAutoDrop] = useState(true);

  const { tetromino, position, randomize, makeMove } = useTetromino(params);

  const willTetrominoCollide = ({
    matrix = tetromino,
    offset = { rowIndex: 0, columnIndex: 0 },
  }: { matrix?: typeof tetromino; offset?: Position } = {}) =>
    matrix.some((row, rowIndex) =>
      row.some((fill, columnIndex) => {
        const rowIndexAhead = rowIndex + position.rowIndex + offset.rowIndex;
        const columnIndexAhead =
          columnIndex + position.columnIndex + offset.columnIndex;

        return (
          fill &&
          (mergedTiles[rowIndexAhead]?.[columnIndexAhead]?.fill ||
            rowIndexAhead >= height ||
            columnIndexAhead >= width ||
            columnIndexAhead < 0)
        );
      })
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(randomize, [mergedTiles]);

  useDidUpdate(
    () => {
      if (willTetrominoCollide()) {
        setTiles(emptyTiles);
        setMergedTiles(emptyTiles);
        setClearedRowsCount(0);
      } else {
        setTiles(
          produce(mergedTiles, (draft) => {
            tetromino.forEach((row, rowIndex) => {
              row.forEach((fill, columnIndex) => {
                if (fill) {
                  /* eslint-disable no-param-reassign */
                  draft[rowIndex + position.rowIndex][
                    columnIndex + position.columnIndex
                  ].fill = fill;
                }
              });
            });
          })
        );
      }
    },
    tetromino,
    position
  );

  useDidUpdate(() => {
    const willCollide = willTetrominoCollide(
      move.isRotation ? { matrix: rotateMatrix(tetromino) } : move
    );

    if (willCollide && move.isDown) {
      const filledRowsIndexes = tiles.reduce((indexes, row, index) => {
        const hasEmptyTiles = row.some(({ fill }) => !fill);

        if (!hasEmptyTiles) {
          indexes.push(index);
        }

        return indexes;
      }, [] as number[]);

      const { length } = filledRowsIndexes;

      if (length) {
        setClearedRowsCount(clearedRowsCount + length);
        setMergedTiles(
          produce(tiles, (draft) => {
            filledRowsIndexes.forEach((index) => {
              for (let rowIndex = index; rowIndex; rowIndex -= 1) {
                draft[rowIndex].forEach((tile, columnIndex) => {
                  tile.fill = draft[rowIndex - 1][columnIndex].fill;
                });
              }
            });
          })
        );
      } else {
        setMergedTiles(tiles);
      }
    } else if (!willCollide) {
      makeMove(move);
    }
  }, move);

  useDidUpdate(() => {
    setScore(clearedRowsCount ? score + clearedRowsCount * 10 : 0);
  }, clearedRowsCount);

  useInterval(
    () => {
      setMove(createMove());
    },
    isAutoDrop ? 1e3 : null
  );

  return { tiles, score, setMove, setIsAutoDrop };
};

export default useTetris;
