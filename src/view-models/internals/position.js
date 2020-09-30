import { immerable } from 'immer';

export class Position {
  [immerable] = true;

  rowAddress;
  colAddress;

  constructor(
    rowAddress = 0,
    colAddress = 0
  ) {
    this.rowAddress = rowAddress;
    this.colAddress = colAddress;
  }
}
