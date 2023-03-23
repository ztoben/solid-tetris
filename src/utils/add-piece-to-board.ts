import { Board, Piece } from "../types";

export function addPieceToBoard(piece: Piece, board: Board): Board | undefined {
  // copy the board
  const newBoard = JSON.parse(JSON.stringify(board));

  // add the piece to the top center of the board
  const boardWidth = board[0].length;
  const pieceWidth = piece.shape[0].length;
  const pieceHeight = piece.shape.length;
  const center = Math.floor(boardWidth / 2);
  const left = center - Math.floor(pieceWidth / 2);

  // if any of the new cells are overlapping with existing cells, return the original board
  for (let i = 0; i < pieceHeight; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      if (piece.shape[i][j].value === 1 && newBoard[i][j + left].value === 1) {
        return undefined;
      }
    }
  }

  // add the piece to the board
  for (let i = 0; i < pieceHeight; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      newBoard[i][left + j] = {
        value: piece.shape[i][j].value,
        color: piece.shape[i][j].color,
        isFalling: piece.shape[i][j].isFalling,
      };
    }
  }  

  return newBoard;
}