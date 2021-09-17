import Props from 'containers/Tetris/props';
import Move from 'types/move';

import ActionType from './actionType';

type Action =
  | {
      type: ActionType.Moving;
      payload: Move;
    }
  | {
      type: ActionType.Creating;
      payload: Props;
    };

export default Action;
