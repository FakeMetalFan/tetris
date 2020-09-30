import produce, { immerable } from 'immer';

import cloneDeep from 'lodash/cloneDeep';

import { v4 as uuid } from 'uuid';

import { rotationDirection } from 'const';

export class Tetromino {
  [immerable] = true;

  _id = uuid(); // to always detect a new piece;

  constructor(
    matrix
  ) {
    this.matrix = matrix;
  }

  rotate(direction) {
    this.matrix = produce(this.matrix, draft => {
      draft.forEach((_, rowAddress) => {
        draft[rowAddress] = this.matrix.map(col => col[rowAddress]);
      });

      if (direction === rotationDirection.Clockwise) draft.map(row => row.reverse());
      else draft.reverse();
    });

    return this;
  }

  clone() {
    return cloneDeep(this);
  }

  get width() {
    return this.matrix.length;
  }
}
