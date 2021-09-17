import KeyCode from 'constants/keyCode';
import Props from 'containers/Tetris/props';
import { useEffect, useReducer } from 'react';

import useDidUpdate from '../useDidUpdate';
import useInterval from '../useInterval';
import useTetromino from '../usePiece';
import ActionType from './actionType';
import checkCollision from './checkCollision';
import createMove from './createMove';
import reducer from './reducer';
import useEmptyTiles from './useEmptyTiles';

export default (props: Props) => {
  const { pieceState, createPiece, movePiece } = useTetromino(props);

  const emptyTiles = useEmptyTiles(props);

  const [state, dispatch] = useReducer(reducer, {
    tiles: emptyTiles,
    mergedTiles: emptyTiles,
    piece: pieceState.piece,
    score: 0,
    isAutoDrop: true,
  });

  const setIsAutoDrop = (isAutoDrop: boolean) => {
    dispatch({
      type: ActionType.AutoDropSetting,
      payload: isAutoDrop,
    });
  };

  const attemptMove = (code?: KeyCode) => {
    const move = createMove(code);

    dispatch({
      type: ActionType.MoveCreating,
      payload: {
        move,
        pieceState,
      },
    });
  };

  const makeMove = (code: KeyCode) => {
    if (code === KeyCode.ArrowDown) {
      setIsAutoDrop(false);
    }

    attemptMove(code);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(createPiece, [state.mergedTiles]);

  useDidUpdate(() => {
    movePiece(state.move);
  }, state.move);

  useDidUpdate(() => {
    const willCollide = checkCollision(state.mergedTiles, pieceState);

    dispatch(
      willCollide
        ? {
            type: ActionType.Resetting,
            payload: emptyTiles,
          }
        : {
            type: ActionType.PieceMerging,
            payload: pieceState,
          }
    );
  }, pieceState);

  useInterval(attemptMove, state.isAutoDrop ? 1e3 : 0);

  return {
    state,
    setIsAutoDrop,
    makeMove,
  };
};
