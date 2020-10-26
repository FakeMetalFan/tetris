import { TileVM } from 'view-models/tile'; // to avoid circular dependency;

import { tileFill } from './tile-fill';

export const matrices = [
  [
    [new TileVM, new TileVM(tileFill.I), new TileVM, new TileVM],
    [new TileVM, new TileVM(tileFill.I), new TileVM, new TileVM],
    [new TileVM, new TileVM(tileFill.I), new TileVM, new TileVM],
    [new TileVM, new TileVM(tileFill.I), new TileVM, new TileVM],
  ],
  [
    [new TileVM, new TileVM(tileFill.J), new TileVM],
    [new TileVM, new TileVM(tileFill.J), new TileVM],
    [new TileVM(tileFill.J), new TileVM(tileFill.J), new TileVM],
  ],
  [
    [new TileVM, new TileVM(tileFill.L), new TileVM],
    [new TileVM, new TileVM(tileFill.L), new TileVM],
    [new TileVM, new TileVM(tileFill.L), new TileVM(tileFill.L)],
  ],
  [
    [new TileVM(tileFill.O), new TileVM(tileFill.O)],
    [new TileVM(tileFill.O), new TileVM(tileFill.O)],
  ],
  [
    [new TileVM, new TileVM(tileFill.S), new TileVM(tileFill.S)],
    [new TileVM(tileFill.S), new TileVM(tileFill.S), new TileVM],
    [new TileVM, new TileVM, new TileVM],
  ],
  [
    [new TileVM, new TileVM(tileFill.T), new TileVM],
    [new TileVM(tileFill.T), new TileVM(tileFill.T), new TileVM(tileFill.T)],
    [new TileVM, new TileVM, new TileVM],
  ],
  [
    [new TileVM(tileFill.Z), new TileVM(tileFill.Z), new TileVM],
    [new TileVM, new TileVM(tileFill.Z), new TileVM(tileFill.Z)],
    [new TileVM, new TileVM, new TileVM],
  ],
];
