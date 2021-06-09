import MoveCode from 'constants/moveCode';
import createMove from 'utils/createMove';

describe('createMove', () => {
  const downMove = { isDown: true, offset: { rowIndex: 1, columnIndex: 0 } };

  it('should create a rotation move', () => {
    expect(createMove(MoveCode.Rotation)).toStrictEqual({ isRotation: true });
  });

  it('should create a left move', () => {
    expect(createMove(MoveCode.Left)).toStrictEqual({
      offset: { rowIndex: 0, columnIndex: -1 },
    });
  });

  it('should create a right move', () => {
    expect(createMove(MoveCode.Right)).toStrictEqual({
      offset: { rowIndex: 0, columnIndex: 1 },
    });
  });

  it('should create a down move', () => {
    expect(createMove(MoveCode.Down)).toStrictEqual(downMove);
  });

  it('should create a down move by default', () => {
    expect(createMove()).toStrictEqual(downMove);
  });
});
