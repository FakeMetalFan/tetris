import { moveCode, moveOffset, rotationDirection } from 'const';

import { Move } from './internals';

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
