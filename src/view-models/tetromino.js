import produce from 'immer';

import { v4 as uuid } from 'uuid';

import { clone } from 'decorators/clone';

import { Position } from './position';

export class Tetromino {
  id = uuid(); // to always detect a new piece;
  position = new Position();

  matrix;

  constructor(
    matrix
  ) {
    this.matrix = matrix;
  }

  @clone
  clone() {
    this.id = uuid();

    return this;
  }

  @clone
  setColAddress(colAddress) {
    this.position.colAddress = colAddress;

    return this;
  }

  @clone
  move({ rowAddress = 0, colAddress = 0 }) {
    this.position = produce(this.position, draft => {
      draft.rowAddress += rowAddress;
      draft.colAddress += colAddress;
    });

    return this;
  }

  @clone
  rotate() {
    this.matrix = produce(this.matrix, draft => {
      draft.forEach((_, rowAddress) => {
        draft[rowAddress] = this.matrix.map(col => col[rowAddress]);
      });

      draft.map(row => row.reverse());
    });

    return this;
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
