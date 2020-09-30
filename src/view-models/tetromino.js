import produce, { immerable } from 'immer';

import cloneDeep from 'lodash/cloneDeep';

import { v4 as uuid } from 'uuid';

import { rotationDirection } from 'const';

import { Position } from './internals';

export class Tetromino {
  [immerable] = true;
  id = uuid(); // to always detect a new piece;
  position = new Position();

  constructor(
    matrix
  ) {
    this.matrix = matrix;
  }

  setColAddress(colAddress) {
    this.position = new Position(0, colAddress);

    return this;
  }

  setOffset({ rowAddress = 0, colAddress = 0 }) {
    this.position = produce(this.position, draft => {
      draft.rowAddress += rowAddress;
      draft.colAddress += colAddress;
    });

    return this;
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

  get rowAddress() {
    return this.position.rowAddress;
  }

  get colAddress() {
    return this.position.colAddress;
  }
}
