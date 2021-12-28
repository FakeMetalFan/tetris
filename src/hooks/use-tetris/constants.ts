import TILE_FILL from 'constants/tile-fill';

export const TETROMINOS = [
  [
    [
      TILE_FILL.NONE,
      TILE_FILL.I,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.I,
      TILE_FILL.NONE,
      TILE_FILL.NONE],
    [
      TILE_FILL.NONE,
      TILE_FILL.I,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.I,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
  ],
  [
    [
      TILE_FILL.NONE,
      TILE_FILL.J,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.J,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.J,
      TILE_FILL.J,
      TILE_FILL.NONE,
    ],
  ],
  [
    [
      TILE_FILL.NONE,
      TILE_FILL.L,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.L,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.L,
      TILE_FILL.L,
    ],
  ],
  [
    [
      TILE_FILL.O,
      TILE_FILL.O,
    ],
    [
      TILE_FILL.O,
      TILE_FILL.O,
    ],
  ],
  [
    [
      TILE_FILL.NONE,
      TILE_FILL.S,
      TILE_FILL.S,
    ],
    [
      TILE_FILL.S,
      TILE_FILL.S,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
  ],
  [
    [
      TILE_FILL.NONE,
      TILE_FILL.T,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.T,
      TILE_FILL.T,
      TILE_FILL.T,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
  ],
  [
    [
      TILE_FILL.Z,
      TILE_FILL.Z,
      TILE_FILL.NONE,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.Z,
      TILE_FILL.Z,
    ],
    [
      TILE_FILL.NONE,
      TILE_FILL.NONE,
      TILE_FILL.NONE,
    ],
  ],
];

export const MOVE_OFFSET = {
  LEFT: {
    y: -1,
  },
  RIGHT: {
    y: 1,
  },
  BOTTOM: {
    x: 1,
  },
};
