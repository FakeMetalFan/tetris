import { act, fireEvent, render } from '@testing-library/react';
import tileStyles from 'components/Tile/tile.module.scss';
import KeyCode from 'constants/keyCode';
import * as tetrominos from 'constants/tetrominos';
import TileFill from 'constants/tileFill';
import Tetris from 'containers/Tetris';
import styles from 'containers/Tetris/tetris.module.scss';
import setupIcons from 'setupIcons';

describe('Tetris', () => {
  const oTetromino = [
    [TileFill.O, TileFill.O],
    [TileFill.O, TileFill.O],
  ];

  beforeAll(() => {
    setupIcons();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should be focused', () => {
    const { getByTestId } = render(<Tetris width={1} height={1} />);

    expect(document.activeElement).toStrictEqual(getByTestId(styles.tetris));
  });

  it('should display tiles', () => {
    const { getByTestId } = render(<Tetris width={5} height={5} />);
    const tiles = getByTestId(styles.tiles);

    expect(tiles.childElementCount).toBe(25);
    expect(tiles.style.gridTemplateColumns).toBe('repeat(5, 1fr)');
  });

  it('should prevent navigating to the same url when clicked', () => {
    const { getByTestId } = render(<Tetris width={1} height={2} />);
    const clickEvent = new MouseEvent('click', { bubbles: true });

    clickEvent.preventDefault = jest.fn();

    fireEvent(getByTestId(styles.tetris), clickEvent);

    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should rotate tetromino', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (tetrominos as any).default = [
      [
        [TileFill.Z, TileFill.Z, TileFill.Empty],
        [TileFill.Empty, TileFill.Z, TileFill.Z],
        [TileFill.Empty, TileFill.Empty, TileFill.Empty],
      ],
    ];

    const { getByTestId } = render(<Tetris width={5} height={4} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[2].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[7].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[8].classList.contains(tileStyles.z)).toBe(true);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowUp });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowUp });

    expect(tiles[3].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[7].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[8].classList.contains(tileStyles.z)).toBe(true);
    expect(tiles[12].classList.contains(tileStyles.z)).toBe(true);
  });

  it('should move tetromino to the left', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={3} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowLeft });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowLeft });

    expect(tiles[0].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[4].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
  });

  it('should move tetromino to the right', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={3} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowRight });
    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowRight });

    expect(tiles[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[3].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[7].classList.contains(tileStyles.o)).toBe(true);
  });

  it('should drop tetromino with auto drop handling', () => {
    (tetrominos as any).default = [oTetromino];

    const { getByTestId } = render(<Tetris width={4} height={8} />);
    const tetris = getByTestId(styles.tetris);
    const { children: tiles } = getByTestId(styles.tiles);

    expect(tiles[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetris, { keyCode: KeyCode.ArrowDown });

    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[9].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[10].classList.contains(tileStyles.o)).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1e3);
    });

    expect(tiles[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[9].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[10].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyUp(tetris, { keyCode: KeyCode.ArrowDown });

    act(() => {
      jest.advanceTimersByTime(2e3);
    });

    expect(tiles[13].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[14].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[17].classList.contains(tileStyles.o)).toBe(true);
    expect(tiles[18].classList.contains(tileStyles.o)).toBe(true);
  });
});
