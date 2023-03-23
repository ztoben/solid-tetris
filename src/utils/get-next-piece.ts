import { Piece, Cell } from "../types";

function filledCell(color: string): Cell {
  return {
    color,
    value: 1,
    isFalling: true,
  };
}

function emptyCell(): Cell {
  return {
    color: 'white',
    value: 0,
    isFalling: false,
  };
}

const pieces: Piece[] = [
  {
    type: 'I',
    shape: [
      [filledCell('cyan'), filledCell('cyan'), filledCell('cyan'), filledCell('cyan')],
      [emptyCell(), emptyCell(), emptyCell(), emptyCell()],
    ],
  },
  {
    type: 'J',
    shape: [
      [filledCell('blue'), filledCell('blue'), filledCell('blue')],
      [emptyCell(), emptyCell(), filledCell('blue')],
    ],
  },
  {
    type: 'L',
    shape: [
      [filledCell('orange'), filledCell('orange'), filledCell('orange')],
      [filledCell('orange'), emptyCell(), emptyCell()],
    ],
  },
  {
    type: 'O',
    shape: [
      [filledCell('yellow'), filledCell('yellow')],
      [filledCell('yellow'), filledCell('yellow')],
    ],
  },
  {
    type: 'S',
    shape: [
      [emptyCell(), filledCell('green'), filledCell('green')],
      [filledCell('green'), filledCell('green'), emptyCell()],
    ],
  },
  {
    type: 'T',
    shape: [
      [filledCell('purple'), filledCell('purple'), filledCell('purple')],
      [emptyCell(), filledCell('purple'), emptyCell()],
    ],
  },
  {
    type: 'Z',
    shape: [
      [filledCell('red'), filledCell('red'), emptyCell()],
      [emptyCell(), filledCell('red'), filledCell('red')],
    ],
  },
];
  

export function getNextPiece(): Piece {
  const randomIndex = Math.floor(Math.random() * pieces.length);
  return pieces[randomIndex];
}
