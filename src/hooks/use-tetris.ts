import TileFill from 'constants/tile-fill';
import produce from 'immer';
import { useEffect, useMemo, useState } from 'react';
import addId from 'utils/add-id';
import createMove from 'utils/create-move';
import FillChecker from 'utils/fill-checker';
import rotateMatrix from 'utils/rotate-matrix';

import useDidUpdate from './use-did-update';
import useInterval from './use-interval';
import useTetromino from './use-tetromino';

const useTetris = (params: TetrisParams) => {
  const { width, height } = params;

  const emptyTiles = useMemo(
    () =>
      Array.from({ length: height }, () =>
        Array.from({ length: width }, () => addId({ fill: TileFill.Empty }))
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
  }: { matrix?: TileFill[][]; offset?: Position } = {}) =>
    matrix.some((row, rowIndex) =>
      row.some((fill, columnIndex) => {
        const rowIndexAhead = rowIndex + position.rowIndex + offset.rowIndex;
        const columnIndexAhead =
          columnIndex + position.columnIndex + offset.columnIndex;

        return (
          !new FillChecker(fill).isEmpty &&
          (!new FillChecker(
            mergedTiles[rowIndexAhead]?.[columnIndexAhead]?.fill
          ).isEmpty ||
            rowIndexAhead >= height ||
            columnIndexAhead >= width ||
            columnIndexAhead < 0)
        );
      })
    );

  useEffect(() => {
    randomize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedTiles]);

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
                if (!new FillChecker(fill).isEmpty) {
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
      const filledRowsIndexes = tiles.reduce((acc: number[], row, rowIndex) => {
        const hasEmptyTiles = row.some(
          (tile) => new FillChecker(tile.fill).isEmpty
        );

        if (!hasEmptyTiles) {
          acc.push(rowIndex);
        }

        return acc;
      }, []);

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
