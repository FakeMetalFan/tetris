import State from './state';

export default ({ tiles }: State) =>
  tiles.reduce((acc: number[], arr, row) => {
    const isEmpty = arr.some((tile) => !tile.fill);

    if (!isEmpty) {
      acc.push(row);
    }

    return acc;
  }, []);
