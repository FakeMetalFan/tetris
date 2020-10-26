import { moveOffset } from 'const';

class Move {
  _id = Symbol(); // to always detect a new move;

  get isRotation() {
    return this instanceof Rotation;
  }

  get isDown() {
    return this instanceof DownMove;
  }
}

export class LeftMove extends Move {
  offset = moveOffset.Left;
}

export class Rotation extends Move {}

export class RightMove extends Move {
  offset = moveOffset.Right;
}

export class DownMove extends Move {
  offset = moveOffset.Down;
}
