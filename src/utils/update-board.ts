import { Board, Cell, Piece, Row } from "../types";
import { addPieceToBoard } from "./add-piece-to-board";
import { getNextPiece } from './get-next-piece';

export function freezeAllFallingCells(board: Board) {
  board.forEach((row: Row) => {
    row.forEach((cell: Cell) => {
      if (cell.isFalling) {
        cell.isFalling = false;
      }
    });
  });
}

export function updateBoard(
  board: Board | undefined,
  nextPiece: Piece,
  setNextPiece: (piece: Piece) => void,
  setGameOver: (gameOver: boolean) => void,
  setScore: (score: number) => void,
  score: number,
) : Board | undefined { 
  if (!board) return undefined;

  // make a copy of the board
  const newBoard: Board = JSON.parse(JSON.stringify(board));

  // if any falling cells have a non falling cell below them, set all falling cells to not falling
  for (let i = newBoard.length - 1; i >= 0; i--) {
    for (let j = 0; j < newBoard[i].length; j++) {
      if (newBoard[i][j].isFalling) {
        if (i === newBoard.length - 1 || (newBoard[i + 1][j].value === 1 && !newBoard[i + 1][j].isFalling)) {
          freezeAllFallingCells(newBoard);
        }
      }
    }
  }

  // move all falling cells down one row if it is possible
  for (let i = newBoard.length - 1; i >= 0; i--) {
    for (let j = 0; j < newBoard[i].length; j++) {
      if (newBoard[i][j].isFalling) {
        newBoard[i + 1][j] = {
          value: 1,
          color: newBoard[i][j].color,
          isFalling: newBoard[i][j].isFalling,
        };
        newBoard[i][j] = {
          value: 0,
          color: 'white',
          isFalling: false,
        };
      }
    }
  }

  // remove any rows that are full of non falling cells and shift the rows above down
  for (let i = newBoard.length - 1; i >= 0; i--) {
    if (newBoard[i].every((cell: Cell) => cell.value === 1 && !cell.isFalling)) {
      setScore(score + 1);
      newBoard.splice(i, 1);
      newBoard.unshift(new Array(newBoard[0].length).fill({
        value: 0,
        color: 'white',
        isFalling: false,
      }));
    }
  }

  // if there are no falling cells left, add a new falling shape
  if (!newBoard.some((row: Row) => row.some((cell: Cell) => cell.isFalling))) {
    const newBoardWithPiece = addPieceToBoard(nextPiece, newBoard);

    if (!newBoardWithPiece) {
      setGameOver(true);
      return newBoard;
    };

    setNextPiece(getNextPiece());

    return newBoardWithPiece;
  }
  
  return newBoard;
}