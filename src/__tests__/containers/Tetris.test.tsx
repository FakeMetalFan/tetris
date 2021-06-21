import { act, fireEvent, render } from '@testing-library/react';
import tileStyles from 'components/Tile/tile.module.scss';
import KeyCode from 'constants/keyCode';
import * as tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import Tetris from 'containers/Tetris';
import styles from 'containers/Tetris/tetris.module.scss';

describe('Tetris', () => {
  const oTetromino = [
    [TileFill.O, TileFill.O],
    [TileFill.O, TileFill.O],
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should be focused', () => {
    expect(
      render(<Tetris width={1} height={1} />).getByTestId(styles.tetris)
    ).toStrictEqual(document.activeElement);
  });

  it('should display tiles', () => {
    const tiles = render(<Tetris width={5} height={5} />).getByTestId(
      styles.tiles
    );

    expect(tiles.childElementCount).toBe(25);
    expect(tiles.style.gridTemplateColumns).toBe('repeat(5, 1fr)');
  });

  it('should prevent navigating to the same url when clicked', () => {
    const clickEvent = new MouseEvent('click', { bubbles: true });

    clickEvent.preventDefault = jest.fn();

    fireEvent(
      render(<Tetris width={1} height={2} />).getByTestId(styles.tetris),
      clickEvent
    );

    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should rotate tetromino', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (tetrominos as any).default = [
      [
        [TileFill.Z, TileFill.Z, undefined],
        [undefined, TileFill.Z, TileFill.Z],
        [undefined, undefined, undefined],
      ],
    ];

    const { getByTestId } = render(<Tetris width={5} height={4} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1]).toHaveClass(tileStyles.z);
    expect(tiles[2]).toHaveClass(tileStyles.z);
    expect(tiles[7]).toHaveClass(tileStyles.z);
    expect(tiles[8]).toHaveClass(tileStyles.z);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowUp });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowUp });

    expect(tiles[3]).toHaveClass(tileStyles.z);
    expect(tiles[7]).toHaveClass(tileStyles.z);
    expect(tiles[8]).toHaveClass(tileStyles.z);
    expect(tiles[12]).toHaveClass(tileStyles.z);
  });

  it('should move tetromino to the left', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={3} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1]).toHaveClass(tileStyles.o);
    expect(tiles[2]).toHaveClass(tileStyles.o);
    expect(tiles[5]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowLeft });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowLeft });

    expect(tiles[0]).toHaveClass(tileStyles.o);
    expect(tiles[1]).toHaveClass(tileStyles.o);
    expect(tiles[4]).toHaveClass(tileStyles.o);
    expect(tiles[5]).toHaveClass(tileStyles.o);
  });

  it('should move tetromino to the right', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={3} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1]).toHaveClass(tileStyles.o);
    expect(tiles[2]).toHaveClass(tileStyles.o);
    expect(tiles[5]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowRight });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowRight });

    expect(tiles[2]).toHaveClass(tileStyles.o);
    expect(tiles[3]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);
    expect(tiles[7]).toHaveClass(tileStyles.o);
  });

  it('should drop tetromino with auto drop handling', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={8} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1]).toHaveClass(tileStyles.o);
    expect(tiles[2]).toHaveClass(tileStyles.o);
    expect(tiles[5]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowDown });

    expect(tiles[5]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);
    expect(tiles[9]).toHaveClass(tileStyles.o);
    expect(tiles[10]).toHaveClass(tileStyles.o);

    act(() => {
      jest.advanceTimersByTime(1e3);
    });

    expect(tiles[5]).toHaveClass(tileStyles.o);
    expect(tiles[6]).toHaveClass(tileStyles.o);
    expect(tiles[9]).toHaveClass(tileStyles.o);
    expect(tiles[10]).toHaveClass(tileStyles.o);

    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowDown });

    act(() => {
      jest.advanceTimersByTime(2e3);
    });

    expect(tiles[13]).toHaveClass(tileStyles.o);
    expect(tiles[14]).toHaveClass(tileStyles.o);
    expect(tiles[17]).toHaveClass(tileStyles.o);
    expect(tiles[18]).toHaveClass(tileStyles.o);
  });
});
