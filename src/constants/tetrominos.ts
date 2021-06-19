import TileFill from './tileFill';

const tetrominos = [
  [
    [undefined, TileFill.I, undefined, undefined],
    [undefined, TileFill.I, undefined, undefined],
    [undefined, TileFill.I, undefined, undefined],
    [undefined, TileFill.I, undefined, undefined],
  ],
  [
    [undefined, TileFill.J, undefined],
    [undefined, TileFill.J, undefined],
    [TileFill.J, TileFill.J, undefined],
  ],
  [
    [undefined, TileFill.L, undefined],
    [undefined, TileFill.L, undefined],
    [undefined, TileFill.L, TileFill.L],
  ],
  [
    [TileFill.O, TileFill.O],
    [TileFill.O, TileFill.O],
  ],
  [
    [undefined, TileFill.S, TileFill.S],
    [TileFill.S, TileFill.S, undefined],
    [undefined, undefined, undefined],
  ],
  [
    [undefined, TileFill.T, undefined],
    [TileFill.T, TileFill.T, TileFill.T],
    [undefined, undefined, undefined],
  ],
  [
    [TileFill.Z, TileFill.Z, undefined],
    [undefined, TileFill.Z, TileFill.Z],
    [undefined, undefined, undefined],
  ],
];

export default tetrominos;
