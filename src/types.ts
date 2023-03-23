export interface Cell {
  value: number;
  color: string;
  isFalling?: boolean;
}

export interface Row extends Array<Cell> {}

export interface Board extends Array<Row> {}

export interface Piece {
  type: string;
  shape: Board;
}
