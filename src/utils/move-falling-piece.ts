import { Board, Cell, Row } from "../types";

export function moveFallingShapeOnBoard(board: Board | undefined, direction: string): Board | undefined {
  if (!board) return board;

  // copy the board
  const newBoard = JSON.parse(JSON.stringify(board));

  // get indexes for all falling cells
  const fallingCells: { row: number, col: number }[] = board.reduce((acc: { row: number, col: number }[], row: Row, rowIdx: number) => {
    row.forEach((cell: Cell, colIdx: number) => {
      if (cell.isFalling) {
        acc.push({ row: rowIdx, col: colIdx });
      }
    });
    return acc;
  }, []);

  // move the falling cells
  if (direction === 'left') {
    for (let i = 0; i < fallingCells.length; i++) {
    const { row, col } = fallingCells[i];
      if (col === 0 || (newBoard[row][col - 1].value === 1 && !newBoard[row][col - 1].isFalling)) {
        return board;
      }

      newBoard[row][col - 1] = {
        value: newBoard[row][col].value,
        color: newBoard[row][col].color,
        isFalling: newBoard[row][col].isFalling,
      };
      newBoard[row][col] = {
        value: 0,
        color: '',
        isFalling: false,
      };
    }
  } else if (direction === 'right') {
    // move through the falling cells right to left
    for (let i = fallingCells.length - 1; i >= 0; i--) {
      const { row, col } = fallingCells[i];
      if (col === newBoard[row].length - 1 || (newBoard[row][col + 1].value === 1 && !newBoard[row][col + 1].isFalling)) {
        return board;
      }

      newBoard[row][col + 1] = {
        value: newBoard[row][col].value,
        color: newBoard[row][col].color,
        isFalling: newBoard[row][col].isFalling,
      };
      newBoard[row][col] = {
        value: 0,
        color: '',
        isFalling: false,
      };
    }
  } else if (direction === 'down') {
    // move through the falling cells bottom to top
    for (let i = fallingCells.length - 1; i >= 0; i--) {
      const { row, col } = fallingCells[i];
      if (row === newBoard.length - 1 || (newBoard[row + 1][col].value === 1 && !newBoard[row + 1][col].isFalling)) {
        return board;
      }

      newBoard[row + 1][col] = {
        value: newBoard[row][col].value,
        color: newBoard[row][col].color,
        isFalling: newBoard[row][col].isFalling,
      };
      newBoard[row][col] = {
        value: 0,
        color: '',
        isFalling: false,
      };
    }
  } else if (direction === 'rotate') {
    // TODO: rotate the falling piece, check if it's a valid move, then place it on the new board
  }
    
  return newBoard;
}