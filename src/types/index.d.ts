interface TetrisProps {
  width: number;
  height: number;
}

interface Move {
  isRotation?: boolean;
  isDown?: boolean;
  offset?: Position;
}

interface Position {
  rowIndex: number;
  columnIndex: number;
}
