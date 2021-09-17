import produce, { Draft } from 'immer';

export default <T>(piece: T[][]) =>
  produce(piece, (draft) => {
    draft.forEach((_, index) => {
      // eslint-disable-next-line no-param-reassign
      draft[index] = piece.map((row) => row[index]) as Draft<T[]>;
    });

    draft.map((row) => row.reverse());
  });
