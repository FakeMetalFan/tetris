import produce from 'immer';

import { clone } from 'decorators/clone';

import { Position } from './position';

export class Tetromino {
  id = Symbol(); // to always detect a new tetromino;
  position = new Position;

  matrix;

  constructor(
    matrix
  ) {
    this.matrix = matrix;
  }

  @clone
  clone() {
    this.id = Symbol();

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
