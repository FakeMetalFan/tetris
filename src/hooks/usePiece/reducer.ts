import produce from 'immer';
import rotateMatrix from 'utils/rotatePiece';

import Action from './action';
import ActionType from './actionType';
import create from './create';
import State from './state';

export default (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.Creating: {
        const { piece, position } = create(action.payload);

        draft.piece = piece;
        draft.position = position;

        break;
      }

      case ActionType.Moving: {
        const { isRotation, position } = action.payload;

        if (isRotation) {
          draft.piece = rotateMatrix(draft.piece);
        } else {
          draft.position.row += position?.row ?? 0;
          draft.position.col += position?.col ?? 0;
        }
      }
    }
  });
