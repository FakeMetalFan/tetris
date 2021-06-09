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
    const { container } = render(<Tetris width={1} height={1} />);

    expect(document.activeElement).toStrictEqual(
      container.getElementsByClassName(styles.tetris)[0]
    );
  });

  it('should set tiles width', () => {
    const width = 2;

    const { container } = render(<Tetris width={width} height={3} />);

    expect(
      (container.getElementsByClassName(styles.tiles)[0] as HTMLDivElement)
        .style.gridTemplateColumns
    ).toBe(`repeat(${width}, 1fr)`);
  });

  it('should display tiles', () => {
    const width = 5;
    const height = 5;

    const { container } = render(<Tetris width={width} height={height} />);

    expect(container.getElementsByClassName(tileStyles.tile).length).toBe(
      width * height
    );
  });

  it('should prevent navigating to the same url when clicked', () => {
    const { container } = render(<Tetris width={1} height={2} />);

    const clickEvent = new MouseEvent('click', { bubbles: true });

    clickEvent.preventDefault = jest.fn();

    fireEvent(container.getElementsByClassName(styles.tetris)[0], clickEvent);

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

    const { container } = render(<Tetris width={5} height={4} />);

    const tetrisElem = container.getElementsByClassName(styles.tetris)[0];

    const { children: tilesElems } = container.getElementsByClassName(
      styles.tiles
    )[0];

    expect(tilesElems[1].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[2].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[7].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[8].classList.contains(tileStyles.z)).toBe(true);

    fireEvent.keyDown(tetrisElem, { keyCode: KeyCode.ArrowUp });
    fireEvent.keyUp(tetrisElem, { keyCode: KeyCode.ArrowUp });

    expect(tilesElems[3].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[7].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[8].classList.contains(tileStyles.z)).toBe(true);
    expect(tilesElems[12].classList.contains(tileStyles.z)).toBe(true);
  });

  it('should move tetromino to the left', () => {
    (tetrominos as any).default = [oTetromino];

    const { container } = render(<Tetris width={4} height={3} />);

    const tetrisElem = container.getElementsByClassName(styles.tetris)[0];

    const { children: tilesElems } = container.getElementsByClassName(
      styles.tiles
    )[0];

    expect(tilesElems[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetrisElem, { keyCode: KeyCode.ArrowLeft });
    fireEvent.keyUp(tetrisElem, { keyCode: KeyCode.ArrowLeft });

    expect(tilesElems[0].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[4].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
  });

  it('should move tetromino to the right', () => {
    (tetrominos as any).default = [oTetromino];

    const { container } = render(<Tetris width={4} height={3} />);

    const tetrisElem = container.getElementsByClassName(styles.tetris)[0];

    const { children: tilesElems } = container.getElementsByClassName(
      styles.tiles
    )[0];

    expect(tilesElems[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetrisElem, { keyCode: KeyCode.ArrowRight });
    fireEvent.keyUp(tetrisElem, { keyCode: KeyCode.ArrowRight });

    expect(tilesElems[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[3].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[7].classList.contains(tileStyles.o)).toBe(true);
  });

  it('should drop tetromino with auto drop handling', () => {
    (tetrominos as any).default = [oTetromino];

    const { container } = render(<Tetris width={4} height={8} />);

    const tetrisElem = container.getElementsByClassName(styles.tetris)[0];

    const { children: tilesElems } = container.getElementsByClassName(
      styles.tiles
    )[0];

    expect(tilesElems[1].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[2].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyDown(tetrisElem, { keyCode: KeyCode.ArrowDown });

    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[9].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[10].classList.contains(tileStyles.o)).toBe(true);

    const autoDropMs = 1e3;

    act(() => {
      jest.advanceTimersByTime(autoDropMs);
    });

    expect(tilesElems[5].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[6].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[9].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[10].classList.contains(tileStyles.o)).toBe(true);

    fireEvent.keyUp(tetrisElem, { keyCode: KeyCode.ArrowDown });

    act(() => {
      jest.advanceTimersByTime(autoDropMs * 2);
    });

    expect(tilesElems[13].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[14].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[17].classList.contains(tileStyles.o)).toBe(true);
    expect(tilesElems[18].classList.contains(tileStyles.o)).toBe(true);
  });
});
