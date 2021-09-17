import Props from 'containers/Tetris/props';
import { useReducer } from 'react';
import Move from 'types/move';

import ActionType from './actionType';
import create from './create';
import reducer from './reducer';

export default (props: Props) => {
  const [pieceState, dispatch] = useReducer(reducer, create(props));

  const createPiece = () => {
    dispatch({
      type: ActionType.Creating,
      payload: props,
    });
  };

  const movePiece = (move: Move = {}) => {
    dispatch({
      type: ActionType.Moving,
      payload: move,
    });
  };

  return {
    pieceState,
    createPiece,
    movePiece,
  };
};
