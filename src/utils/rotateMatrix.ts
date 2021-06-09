import produce, { Draft } from 'immer';

const rotateMatrix = <T>(matrix: T[][]) =>
  produce(matrix, (draft) => {
    draft.forEach((_, index) => {
      // eslint-disable-next-line no-param-reassign
      draft[index] = matrix.map((row) => row[index]) as Draft<T[]>;
    });

    draft.map((row) => row.reverse());
  });

export default rotateMatrix;
