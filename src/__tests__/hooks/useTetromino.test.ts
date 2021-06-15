import { act, renderHook } from '@testing-library/react-hooks';
import * as tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import useTetromino from 'hooks/useTetromino';
import rotateMatrix from 'utils/rotateMatrix';

describe('useTetromino', () => {
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

    const { result } = renderHook(() => useTetromino({ width: 5, height: 5 }));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    expect(tetromino).toStrictEqual(oTetromino);
    expect(position).toStrictEqual({ rowIndex: 0, columnIndex: 1 });

    (tetrominos as any).default = [zTetromino];

    act(() => {
      result.current.randomize();
    });

    const { tetromino: nextTetromino, position: nextPosition } = result.current;

    expect(nextTetromino).toStrictEqual(zTetromino);
    expect(nextPosition).toStrictEqual({ rowIndex: 0, columnIndex: 1 });
  });

  it('should rotate tetromino', () => {
    const { result } = renderHook(() => useTetromino({ width: 5, height: 5 }));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    act(() => {
      result.current.makeMove({ isRotation: true });
    });

    expect(result.current.tetromino).toStrictEqual(rotateMatrix(tetromino));
    expect(result.current.position).toStrictEqual(position);
  });

  it('should move tetromino to the left', () => {
    const { result } = renderHook(() => useTetromino({ width: 5, height: 5 }));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 0, columnIndex: -1 } });
    });

    expect(result.current.tetromino).toStrictEqual(tetromino);
    expect(result.current.position).toStrictEqual({
      ...position,
      columnIndex: position.columnIndex - 1,
    });
  });

  it('should move tetromino to the right', () => {
    const { result } = renderHook(() => useTetromino({ width: 5, height: 5 }));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 0, columnIndex: 1 } });
    });

    expect(result.current.tetromino).toStrictEqual(tetromino);
    expect(result.current.position).toStrictEqual({
      ...position,
      columnIndex: position.columnIndex + 1,
    });
  });

  it('should drop tetromino down', () => {
    const { result } = renderHook(() => useTetromino({ width: 5, height: 5 }));

    act(() => {
      result.current.randomize();
    });

    const { tetromino, position } = result.current;

    act(() => {
      result.current.makeMove({ offset: { rowIndex: 1, columnIndex: 0 } });
    });

    expect(result.current.tetromino).toStrictEqual(tetromino);
    expect(result.current.position).toStrictEqual({
      ...position,
      rowIndex: position.rowIndex + 1,
    });
  });
});
