import Move from 'types/move';

import PieceState from '../usePiece/state';
import ActionType from './actionType';
import Tile from './tile';

type Action =
  | {
      type: ActionType.MoveCreating;
      payload: {
        move: Move;
        pieceState: PieceState;
      };
    }
  | {
      type: ActionType.PieceMerging;
      payload: PieceState;
    }
  | {
      type: ActionType.AutoDropSetting;
      payload: boolean;
    }
  | {
      type: ActionType.Resetting;
      payload: Tile[][];
    };

export default Action;
