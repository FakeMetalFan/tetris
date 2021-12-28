import produce, {
  Draft,
} from 'immer';

export default <T>(matrix: T[][]) =>
  produce(matrix, (draft) => {
    draft.forEach((_, x) => {
      draft[x] = matrix.map((row) => row[x]) as Draft<T[]>;
    });

    draft.map((row) => row.reverse());
  });
