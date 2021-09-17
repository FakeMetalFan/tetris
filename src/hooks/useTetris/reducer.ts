import produce from 'immer';

import Action from './action';
import ActionType from './actionType';
import checkCollision from './checkCollision';
import getFilledRows from './getFilledRows';
import mergePiece from './mergePiece';
import State from './state';

export default (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.MoveCreating: {
        const { move, pieceState } = action.payload;
        const willCollide = checkCollision(state.mergedTiles, pieceState, move);

        if (willCollide && move.isDown) {
          const filledRows = getFilledRows(draft);
          const filledRowsCount = filledRows.length;

          draft.mergedTiles = draft.tiles;

          if (filledRowsCount) {
            draft.score += filledRowsCount * 10;
            filledRows.forEach((row) => {
              for (let lastRow = row; lastRow; lastRow -= 1) {
                draft.mergedTiles[lastRow].forEach((tile, col) => {
                  tile.fill = draft.tiles[lastRow - 1][col].fill;
                });
              }
            });
          }
        } else if (!willCollide) {
          draft.move = move;
        }

        break;
      }

      case ActionType.PieceMerging:
        draft.tiles = mergePiece(draft.mergedTiles, action.payload);

        break;

      case ActionType.AutoDropSetting:
        draft.isAutoDrop = action.payload;

        break;

      case ActionType.Resetting: {
        const tiles = action.payload;

        draft.tiles = tiles;
        draft.mergedTiles = tiles;
        draft.score = 0;

        break;
      }
    }
  });
