import produce from 'immer';

export const getRotatedMatrix = matrix => produce(matrix, draft => {
  draft.forEach((_, rowAddress) => {
    draft[rowAddress] = matrix.map(row => row[rowAddress]);
  });

  draft.map(row => row.reverse());
});
