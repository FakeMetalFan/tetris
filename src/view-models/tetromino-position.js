import { immerable } from 'immer';

export class TetrominoPosition {
  [immerable] = true;

  constructor(
    rowAddress = 0,
    colAddress = 0
  ) {
    this.rowAddress = rowAddress;
    this.colAddress = colAddress;
  }
}
