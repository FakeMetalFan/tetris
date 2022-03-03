type Unique<T extends Record<string, unknown>> = T & {
  id: string;
};

type Point = {
  x: number;
  y: number;
};

type Tile = {
  fill: number;
  merged: boolean;
};

type Tetris = {
  width: number;
  height: number;
  tetromino: number[][];
  point: Point;
  tiles: Unique<Tile>[][];
  fast: boolean;
  score: number;
};
