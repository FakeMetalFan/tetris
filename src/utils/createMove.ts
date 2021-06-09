import MoveCode from 'constants/moveCode';

const createMove = (code?: MoveCode) => {
  switch (code) {
    case MoveCode.Rotation:
      return { isRotation: true };
    case MoveCode.Left:
      return { offset: { rowIndex: 0, columnIndex: -1 } };
    case MoveCode.Right:
      return { offset: { rowIndex: 0, columnIndex: 1 } };
    case MoveCode.Down:
    default:
      return { isDown: true, offset: { rowIndex: 1, columnIndex: 0 } };
  }
};

export default createMove;
