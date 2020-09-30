import { immerable } from 'immer';

import { tileFill } from 'const/tile-fill'; // to avoid circular dependency;

export class TileVM {
  [immerable] = true;

  constructor(
    fill = tileFill.None
  ) {
    this.fill = fill;
  }

  get isEmpty() {
    return this.fill === tileFill.None;
  }
}
