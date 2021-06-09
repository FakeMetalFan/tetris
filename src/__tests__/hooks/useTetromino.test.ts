import { act, renderHook } from '@testing-library/react-hooks';
import * as tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import useTetromino from 'hooks/useTetromino';
import rotateMatrix from 'utils/rotateMatrix';

describe('useTetromino', () => {
  const params = { width: 5, height: 5 };

  const oTetromino = [
    [TileFill.O, TileFill.O],
    [TileFill.O, TileFill.O],
  ];

  const zTetromino = [
    [TileFill.Z, TileFill.Z, TileFill.Empty],
    [TileFill.Empty, TileFill.Z, TileFill.Z],
    [TileFill.Empty, TileFill.Empty, TileFill.Empty],
  ];

  it('should randomize tetromino and set its position', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetromino(params));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(oTetromino);
    expect(position).toStrictEqual({
      rowIndex: 0,
      columnIndex: Math.floor((params.width - tetromino.length) / 2),
    });

    (tetrominos as any).default = [zTetromino];

    act(() => {
      result.current.randomize();
    });

    const { tetromino: nextTetromino, position: nextPosition } = result.current;

    expect(nextTetromino).toStrictEqual(zTetromino);
    expect(nextPosition).toStrictEqual({
      rowIndex: 0,
      columnIndex: Math.floor((params.width - nextTetromino.length) / 2),
    });
  });

  it('should rotate tetromino', () => {
    const { result } = renderHook(() => useTetromino(params));

    act(() => {
      result.current.randomize();
    });

    const {
      tetromino: initialTetromino,
      position: initialPosition,
    } = result.current;

    act(() => {
      result.current.makeMove({ isRotation: true });
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(rotateMatrix(initialTetromino));
    expect(position).toStrictEqual(initialPosition);
  });

  it('should move tetromino to the left', () => {
    const { result } = renderHook(() => useTetromino(params));

    act(() => {
      result.current.randomize();
    });

    const {
      tetromino: initialTetromino,
      position: initialPosition,
    } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 0, columnIndex: -1 } });
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(initialTetromino);
    expect(position).toStrictEqual({
      ...initialPosition,
      columnIndex: initialPosition.columnIndex - 1,
    });
  });

  it('should move tetromino to the right', () => {
    const { result } = renderHook(() => useTetromino(params));

    act(() => {
      result.current.randomize();
    });

    const {
      tetromino: initialTetromino,
      position: initialPosition,
    } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 0, columnIndex: 1 } });
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(initialTetromino);
    expect(position).toStrictEqual({
      ...initialPosition,
      columnIndex: initialPosition.columnIndex + 1,
    });
  });

  it('should drop tetromino down', () => {
    const { result } = renderHook(() => useTetromino(params));

    act(() => {
      result.current.randomize();
    });

    const {
      tetromino: initialTetromino,
      position: initialPosition,
    } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 1, columnIndex: 0 } });
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(initialTetromino);
    expect(position).toStrictEqual({
      ...initialPosition,
      rowIndex: initialPosition.rowIndex + 1,
    });
  });
});
