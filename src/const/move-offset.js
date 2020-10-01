import { Position } from 'view-models/position' // to avoid circular dependency;

export const moveOffset = {
  Left: new Position(0, -1),
  Right: new Position(0, 1),
  Down: new Position(1),
};
