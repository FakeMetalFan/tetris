import { moveCode, moveOffset } from 'const';

class Move {
  _id = Symbol(); // to always detect a new move;

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

export class LeftMove extends Move {
  offset = moveOffset.Left;

  constructor() {
    super(moveCode.Left);
  }
}

export class RotationMove extends Move {
  constructor() {
    super(moveCode.Rotation);
  }
}

export class RightMove extends Move {
  offset = moveOffset.Right;

  constructor() {
    super(moveCode.Right);
  }
}

export class DownMove extends Move {
  offset = moveOffset.Down;

  constructor() {
    super(moveCode.Down);
  }
}
