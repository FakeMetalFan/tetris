import { v4 as uuid } from 'uuid';

import { moveCode, moveOffset, rotationDirection } from 'const';

class Move {
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

export class LeftMove extends Move {
  offset = moveOffset.Left;

  constructor() {
    super(moveCode.Left);
  }

  getOppositeMove() {
    return new RightMove();
  }
}

export class RotationMove extends Move {
  constructor(
    direction = rotationDirection.Clockwise
  ) {
    super(moveCode.Rotation);

    this.direction = direction;
  }

  getOppositeMove() {
    return new RotationMove(
      rotationDirection[this.direction === rotationDirection.Clockwise ? 'Counterclockwise' : 'Clockwise']
    );
  }
}

export class RightMove extends Move {
  offset = moveOffset.Right;

  constructor() {
    super(moveCode.Right);
  }

  getOppositeMove() {
    return new LeftMove();
  }
}

export class DownMove extends Move {
  offset = moveOffset.Down;

  constructor() {
    super(moveCode.Down);
  }
}
