type Point = {
  x: number;
  y: number;
};

type Tile = {
  id: string;
  fill?: number;
  merged?: boolean;
};

type Tetris = {
  width: number;
  height: number;
  tetromino: number[][];
  point: Point;
  tiles: Tile[][];
  fast: boolean;
  score: number;
};
