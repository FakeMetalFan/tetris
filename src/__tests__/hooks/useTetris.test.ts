import { act, renderHook } from '@testing-library/react-hooks';
import MoveCode from 'constants/moveCode';
import * as tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import useTetris from 'hooks/useTetris';
import createMove from 'utils/createMove';

describe('useTetris', () => {
  const oTetromino = [
    [TileFill.O, TileFill.O],
    [TileFill.O, TileFill.O],
  ];

  const zTetromino = [
    [TileFill.Z, TileFill.Z, TileFill.Empty],
    [TileFill.Empty, TileFill.Z, TileFill.Z],
    [TileFill.Empty, TileFill.Empty, TileFill.Empty],
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should randomize tetromino', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    (tetrominos as any).default = [zTetromino];

    for (let i = 0; i < { width: 4, height: 5 }.height - 1; i += 1) {
      act(() => {
        result.current.setMove(createMove());
      });
    }

    const { tiles } = result.current;

    expect(tiles[0][0].fill).toBe(TileFill.Z);
    expect(tiles[0][1].fill).toBe(TileFill.Z);
    expect(tiles[1][1].fill).toBe(TileFill.Z);
    expect(tiles[1][2].fill).toBe(TileFill.Z);
  });

  it('should auto drop tetromino', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    act(() => {
      jest.advanceTimersByTime(2e3);
    });

    const { tiles } = result.current;

    expect(tiles[2][1].fill).toBe(TileFill.O);
    expect(tiles[2][2].fill).toBe(TileFill.O);
    expect(tiles[3][1].fill).toBe(TileFill.O);
    expect(tiles[3][2].fill).toBe(TileFill.O);
  });

  it('should enable / disable auto drop', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    act(() => {
      result.current.setIsAutoDrop(false);
      jest.advanceTimersByTime(1e3);
    });

    const { tiles } = result.current;

    expect(tiles[0][1].fill).toBe(TileFill.O);
    expect(tiles[0][2].fill).toBe(TileFill.O);
    expect(tiles[1][1].fill).toBe(TileFill.O);
    expect(tiles[1][2].fill).toBe(TileFill.O);

    act(() => {
      result.current.setIsAutoDrop(true);

      jest.advanceTimersByTime(2e3);
    });

    const { tiles: nextTiles } = result.current;

    expect(nextTiles[2][1].fill).toBe(TileFill.O);
    expect(nextTiles[2][2].fill).toBe(TileFill.O);
    expect(nextTiles[3][1].fill).toBe(TileFill.O);
    expect(nextTiles[3][2].fill).toBe(TileFill.O);
  });

  it('should reset itself', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    act(() => {
      result.current.setMove(createMove(MoveCode.Left));
      jest.advanceTimersByTime(4e3);
      result.current.setMove(createMove(MoveCode.Right));
      jest.advanceTimersByTime(9e3);
    });

    const { tiles, score } = result.current;

    expect(tiles[0][1].fill).toBe(TileFill.Empty);
    expect(tiles[0][2].fill).toBe(TileFill.Empty);
    expect(tiles[1][1].fill).toBe(TileFill.O);
    expect(tiles[1][2].fill).toBe(TileFill.O);
    expect(tiles[2][1].fill).toBe(TileFill.O);
    expect(tiles[2][2].fill).toBe(TileFill.O);
    expect(tiles[3][1].fill).toBe(TileFill.O);
    expect(tiles[3][2].fill).toBe(TileFill.O);
    expect(tiles[4][1].fill).toBe(TileFill.O);
    expect(tiles[4][2].fill).toBe(TileFill.O);
    expect(score).toBe(20);

    act(() => {
      result.current.setMove(createMove());
    });

    const { tiles: nextTiles } = result.current;

    expect(nextTiles[0][1].fill).toBe(TileFill.O);
    expect(nextTiles[0][2].fill).toBe(TileFill.O);
    expect(nextTiles[1][1].fill).toBe(TileFill.O);
    expect(nextTiles[1][2].fill).toBe(TileFill.O);
    expect(nextTiles[2][1].fill).toBe(TileFill.Empty);
    expect(nextTiles[2][2].fill).toBe(TileFill.Empty);
    expect(nextTiles[3][1].fill).toBe(TileFill.Empty);
    expect(nextTiles[3][2].fill).toBe(TileFill.Empty);
    expect(nextTiles[4][1].fill).toBe(TileFill.Empty);
    expect(nextTiles[4][2].fill).toBe(TileFill.Empty);
  });

  it('should move tetromino to the left without colliding', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        result.current.setMove(createMove(MoveCode.Left));
      });
    }

    const { tiles } = result.current;

    expect(tiles[0][0].fill).toBe(TileFill.O);
    expect(tiles[0][1].fill).toBe(TileFill.O);
    expect(tiles[1][0].fill).toBe(TileFill.O);
    expect(tiles[1][1].fill).toBe(TileFill.O);
  });

  it('should move tetromino to the right without colliding', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        result.current.setMove(createMove(MoveCode.Right));
      });
    }

    const { tiles } = result.current;

    expect(tiles[0][2].fill).toBe(TileFill.O);
    expect(tiles[0][3].fill).toBe(TileFill.O);
    expect(tiles[1][2].fill).toBe(TileFill.O);
    expect(tiles[1][3].fill).toBe(TileFill.O);
  });

  it('should rotate tetromino without colliding', () => {
    (tetrominos as any).default = [zTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    act(() => {
      result.current.setMove(createMove(MoveCode.Left));
    });

    act(() => {
      result.current.setMove(createMove(MoveCode.Rotation));
    });

    act(() => {
      result.current.setMove(createMove(MoveCode.Left));
    });

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        result.current.setMove(createMove(MoveCode.Rotation));
      });
    }

    const { tiles } = result.current;

    expect(tiles[0][1].fill).toBe(TileFill.Z);
    expect(tiles[1][0].fill).toBe(TileFill.Z);
    expect(tiles[1][1].fill).toBe(TileFill.Z);
    expect(tiles[2][0].fill).toBe(TileFill.Z);
  });

  it('should clear filled row and set score', () => {
    (tetrominos as any).default = [oTetromino];

    const { result } = renderHook(() => useTetris({ width: 4, height: 5 }));

    act(() => {
      result.current.setMove(createMove(MoveCode.Left));
      jest.advanceTimersByTime(4e3);
      result.current.setMove(createMove(MoveCode.Right));
      jest.advanceTimersByTime(4e3);
    });

    const { tiles, score } = result.current;

    expect(tiles[3][0].fill).toBe(TileFill.Empty);
    expect(tiles[3][1].fill).toBe(TileFill.Empty);
    expect(tiles[3][2].fill).toBe(TileFill.Empty);
    expect(tiles[3][3].fill).toBe(TileFill.Empty);
    expect(tiles[4][0].fill).toBe(TileFill.Empty);
    expect(tiles[4][1].fill).toBe(TileFill.Empty);
    expect(tiles[4][2].fill).toBe(TileFill.Empty);
    expect(tiles[4][3].fill).toBe(TileFill.Empty);
    expect(score).toBe(20);
  });
});
