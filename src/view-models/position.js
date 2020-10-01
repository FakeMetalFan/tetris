import { immerable } from 'immer';

export class Position {
  [immerable] = true;

  rowAddress;
  tileAddress;

  constructor(
    rowAddress = 0,
    tileAddress = 0
  ) {
    this.rowAddress = rowAddress;
    this.tileAddress = tileAddress;
  }
}
