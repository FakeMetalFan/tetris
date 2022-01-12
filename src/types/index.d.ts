type Unique<O extends Record<string, unknown>> = O & {
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
  field: Unique<Tile>[][];
  fast: boolean;
  score: number;
};
