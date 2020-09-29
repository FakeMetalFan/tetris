import produce from 'immer';

export const getRotatedMatrix = matrix => produce(matrix, draft => {
  draft.forEach((_, rowAddress) => {
    draft[rowAddress] = matrix.map(col => col[rowAddress]).reverse();
  });
});
