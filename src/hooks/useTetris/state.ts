import Move from 'types/move';

import Piece from '../usePiece/piece';
import Tile from './tile';

type State = {
  tiles: Tile[][];
  mergedTiles: Tile[][];
  move?: Move;
  piece: Piece;
  score: number;
  isAutoDrop: boolean;
};

export default State;
