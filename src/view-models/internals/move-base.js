import { v4 as uuid } from 'uuid';

import { moveCode } from 'const';

export class Move {
  _id = uuid(); // to always detect a new move;

  _code;

  constructor(
    code
  ) {
    this._code = code;
  }

  get isRotation() {
    return this._code === moveCode.Rotation;
  }

  get isDown() {
    return this._code === moveCode.Down;
  }
}
