import { Board } from "../types";
import { addPieceToBoard } from "./add-piece-to-board";
import { getNextPiece } from './get-next-piece';

export function initializeBoard(): Board {
  const board = new Array(20).fill(new Array(10).fill({ value: 0, color: 'white' }));
  const firstPiece = getNextPiece();

  return addPieceToBoard(firstPiece, board);
};