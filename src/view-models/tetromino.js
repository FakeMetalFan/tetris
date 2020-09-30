import produce from 'immer';

import { v4 as uuid } from 'uuid';

import { rotationDirection } from 'const';

import { clone } from 'decorators/clone';

import { Position } from './internals';

export class Tetromino {
  id = uuid(); // to always detect a new piece;
  position = new Position();

  constructor(
    matrix
  ) {
    this.matrix = matrix;
  }

  @clone
  getCopied(colAddress) {
    this.id = uuid();
    this.position = new Position(0, colAddress);

    return this;
  }

  @clone
  getMoved({ rowAddress = 0, colAddress = 0 }) {
    this.position = produce(this.position, draft => {
      draft.rowAddress += rowAddress;
      draft.colAddress += colAddress;
    });

    return this;
  }

  @clone
  getRotated(direction) {
    this.matrix = produce(this.matrix, draft => {
      draft.forEach((_, rowAddress) => {
        draft[rowAddress] = this.matrix.map(col => col[rowAddress]);
      });

      if (direction === rotationDirection.Clockwise) draft.map(row => row.reverse());
      else draft.reverse();
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
