import produce, { Draft } from 'immer';

export default <T>(matrix: T[][]) =>
  produce(matrix, (d) => {
    d.forEach((_, index) => {
      d[index] = matrix.map((row) => row[index]) as Draft<T[]>;
    });

    d.map((row) => row.reverse());
  });
