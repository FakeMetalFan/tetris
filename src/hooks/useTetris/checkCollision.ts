import Move from 'types/move';
import rotatePiece from 'utils/rotatePiece';

import State from '../usePiece/state';
import Tile from './tile';

export default (tiles: Tile[][], { piece, position }: State, move?: Move) => {
  const height = tiles.length;
  const width = tiles[0].length;

  return (move?.isRotation ? rotatePiece(piece) : piece).some((arr, row) =>
    arr.some((fill, col) => {
      const rowAhead = row + position.row + (move?.position?.row ?? 0);
      const colAhead = col + position.col + (move?.position?.col ?? 0);

      return (
        fill &&
        (tiles[rowAhead]?.[colAhead]?.fill ||
          rowAhead >= height ||
          colAhead >= width ||
          colAhead < 0)
      );
    })
  );
};
