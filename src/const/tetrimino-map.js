import { TileVM } from 'view-models/tile'; // to avoid circular dependency;
import { Tetromino } from 'view-models/tetromino'; // to avoid circular dependency;

import { tileFill } from './tile-fill';

export const tetrominoMap = new Map()
  .set('I', new Tetromino([
    [new TileVM(), new TileVM(tileFill.I), new TileVM(), new TileVM()],
    [new TileVM(), new TileVM(tileFill.I), new TileVM(), new TileVM()],
    [new TileVM(), new TileVM(tileFill.I), new TileVM(), new TileVM()],
    [new TileVM(), new TileVM(tileFill.I), new TileVM(), new TileVM()],
  ]))
  .set('J', new Tetromino([
    [new TileVM(), new TileVM(tileFill.J), new TileVM()],
    [new TileVM(), new TileVM(tileFill.J), new TileVM()],
    [new TileVM(tileFill.J), new TileVM(tileFill.J), new TileVM()],
  ]))
  .set('L', new Tetromino([
    [new TileVM(), new TileVM(tileFill.L), new TileVM()],
    [new TileVM(), new TileVM(tileFill.L), new TileVM()],
    [new TileVM(), new TileVM(tileFill.L), new TileVM(tileFill.L)],
  ]))
  .set('O', new Tetromino([
    [new TileVM(tileFill.O), new TileVM(tileFill.O)],
    [new TileVM(tileFill.O), new TileVM(tileFill.O)],
  ]))
  .set('S', new Tetromino([
    [new TileVM(), new TileVM(tileFill.S), new TileVM(tileFill.S)],
    [new TileVM(tileFill.S), new TileVM(tileFill.S), new TileVM()],
    [new TileVM(), new TileVM(), new TileVM()],
  ]))
  .set('T', new Tetromino([
    [new TileVM(), new TileVM(tileFill.T), new TileVM()],
    [new TileVM(tileFill.T), new TileVM(tileFill.T), new TileVM(tileFill.T)],
    [new TileVM(), new TileVM(), new TileVM()],
  ]))
  .set('Z', new Tetromino([
    [new TileVM(tileFill.Z), new TileVM(tileFill.Z), new TileVM()],
    [new TileVM(), new TileVM(tileFill.Z), new TileVM(tileFill.Z)],
    [new TileVM(), new TileVM(), new TileVM()],
  ]));
