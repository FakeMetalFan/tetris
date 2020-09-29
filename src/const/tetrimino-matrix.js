import { tileFill } from './tile-fill';

export const tetrominoMatrix = {
  I: [
    [tileFill.None, tileFill.I, tileFill.None, tileFill.None],
    [tileFill.None, tileFill.I, tileFill.None, tileFill.None],
    [tileFill.None, tileFill.I, tileFill.None, tileFill.None],
    [tileFill.None, tileFill.I, tileFill.None, tileFill.None],
  ],
  J: [
    [tileFill.None, tileFill.J, tileFill.None],
    [tileFill.None, tileFill.J, tileFill.None],
    [tileFill.J, tileFill.J, tileFill.None],
  ],
  L: [
    [tileFill.None, tileFill.L, tileFill.None],
    [tileFill.None, tileFill.L, tileFill.None],
    [tileFill.None, tileFill.L, tileFill.L],
  ],
  O: [
    [tileFill.O, tileFill.O],
    [tileFill.O, tileFill.O],
  ],
  S: [
    [tileFill.None, tileFill.S, tileFill.S],
    [tileFill.S, tileFill.S, tileFill.None],
    [tileFill.None, tileFill.None, tileFill.None],
  ],
  T: [
    [tileFill.None, tileFill.T, tileFill.None],
    [tileFill.T, tileFill.T, tileFill.T],
    [tileFill.None, tileFill.None, tileFill.None],
  ],
  Z: [
    [tileFill.Z, tileFill.Z, tileFill.None],
    [tileFill.None, tileFill.Z, tileFill.Z],
    [tileFill.None, tileFill.None, tileFill.None],
  ],
};
