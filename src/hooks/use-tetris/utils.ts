import TILE_FILL from 'constants/tile-fill';

export const catchErr = (callback: () => void) =>
  () => {
    try {
      callback();
    } catch {}
  };

export const getFilledRowsIndexes = (state: Tetris) =>
  state.field.reduce((acc: number[], row, index) => {
    const isFilled = !row.some((tile) => tile.fill === TILE_FILL.NONE);

    if (isFilled) {
      acc.push(index);
    }

    return acc;
  }, []);
