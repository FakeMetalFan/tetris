import produce from 'immer';

import State from '../usePiece/state';
import Tile from './tile';

export default (tiles: Tile[][], { piece, position }: State) =>
  produce(tiles, (draft) => {
    piece.forEach((arr, row) => {
      arr.forEach((fill, col) => {
        if (fill) {
          // eslint-disable no-param-reassign
          draft[row + position.row][col + position.col].fill = fill;
        }
      });
    });
  });
