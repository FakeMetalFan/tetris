import TILE_FILL from 'constants/tile-fill';

export const catchErr = (callback: () => void) =>
  () => {
    try {
      callback();
    } catch {}
  };

export const getFilledRowsIndexes = ({
  field,
}: Tetris) =>
  field.reduce((acc: number[], row, x) => {
    const isFilled = !row.some(({ fill }) => fill === TILE_FILL.NONE);

    if (isFilled) {
      acc.push(x);
    }

    return acc;
  }, []);
