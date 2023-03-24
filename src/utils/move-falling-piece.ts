import { Board, Cell, Row } from "../types";
import { freezeAllFallingCells } from "./update-board";

export function moveFallingShapeOnBoard(board: Board | undefined, direction: string): Board | undefined {
  if (!board) return board;

  const fallingCells: { row: number, col: number }[] = board.reduce((acc: { row: number, col: number }[], row: Row, rowIdx: number) => {
    row.forEach((cell: Cell, colIdx: number) => {
      if (cell.isFalling) {
        acc.push({ row: rowIdx, col: colIdx });
      }
    });
    return acc;
  }, []);

  if (direction === 'left') {
    const newBoard = JSON.parse(JSON.stringify(board));

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

    return newBoard;
  } else if (direction === 'right') {
    const newBoard = JSON.parse(JSON.stringify(board));

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

    return newBoard;
  } else if (direction === 'down') {
    const newBoard = JSON.parse(JSON.stringify(board));

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

    return newBoard;
  } else if (direction === 'rotate-clockwise' || direction === 'rotate-counter-clockwise') {
    const rotatedBoard = JSON.parse(JSON.stringify(board));
    const accumulatedMoves = [];

    if (direction === 'rotate-counter-clockwise') {
      const averageHeightOfFallingCells = Math.floor(fallingCells.reduce((acc, { row }) => acc + row, 0) / fallingCells.length);
      const averageWidthOfFallingCells = Math.floor(fallingCells.reduce((acc, { col }) => acc + col, 0) / fallingCells.length);

      // rotate the falling cells clockwise
      for (let i = 0; i < fallingCells.length; i++) {
        const { row, col } = fallingCells[i];
        const newRow = Math.round(averageHeightOfFallingCells - (col - averageWidthOfFallingCells));
        const newCol = Math.round(averageWidthOfFallingCells + (row - averageHeightOfFallingCells));

        if (newCol < 0 || newCol >= rotatedBoard[row].length || newRow < 0 || newRow >= rotatedBoard.length || (rotatedBoard[newRow][newCol].value === 1 && !rotatedBoard[newRow][newCol].isFalling)) {
          return board;
        }

        accumulatedMoves.push({
          row: newRow,
          col: newCol,
          value: rotatedBoard[row][col].value,
          color: rotatedBoard[row][col].color,
          isFalling: rotatedBoard[row][col].isFalling,
        });
      }
    } else if (direction === 'rotate-clockwise') {
      const averageHeightOfFallingCells = Math.floor(fallingCells.reduce((acc, { row }) => acc + row, 0) / fallingCells.length);
      const averageWidthOfFallingCells = Math.ceil(fallingCells.reduce((acc, { col }) => acc + col, 0) / fallingCells.length);

      // rotate the falling cells counter clockwise
      for (let i = 0; i < fallingCells.length; i++) {
        const { row, col } = fallingCells[i];
        const newRow = Math.round(averageHeightOfFallingCells + (col - averageWidthOfFallingCells));
        const newCol = Math.round(averageWidthOfFallingCells - (row - averageHeightOfFallingCells));

        if (newCol < 0 || newCol >= rotatedBoard[row].length || newRow < 0 || newRow >= rotatedBoard.length || (rotatedBoard[newRow][newCol].value === 1 && !rotatedBoard[newRow][newCol].isFalling)) {
          return board;
        }

        accumulatedMoves.push({
          row: newRow,
          col: newCol,
          value: rotatedBoard[row][col].value,
          color: rotatedBoard[row][col].color,
          isFalling: rotatedBoard[row][col].isFalling,
        });
      }
    }

    // clear out all falling cells
    for (let i = 0; i < fallingCells.length; i++) {
      const { row, col } = fallingCells[i];
      rotatedBoard[row][col] = {
        value: 0,
        color: '',
        isFalling: false,
      };
    }

    // add the accumulated moves to the rotated board
    for (let i = 0; i < accumulatedMoves.length; i++) {
      const { row, col, value, color, isFalling } = accumulatedMoves[i];
      rotatedBoard[row][col] = {
        value,
        color,
        isFalling,
      };
    }

    return rotatedBoard;
  } else if (direction === 'drop') {
    // move the falling cells down until they hit the bottom or another non-falling cell
    let droppedBoard = JSON.parse(JSON.stringify(board));
    let hasDropped = false;

    while (!hasDropped) {
      // if any falling cells have a non falling cell below them, set all falling cells to not falling
      for (let i = droppedBoard.length - 1; i >= 0; i--) {
        for (let j = 0; j < droppedBoard[i].length; j++) {
          if (droppedBoard[i][j].isFalling) {
            if (i === droppedBoard.length - 1 || (droppedBoard[i + 1][j].value === 1 && !droppedBoard[i + 1][j].isFalling)) {
              freezeAllFallingCells(droppedBoard);
              hasDropped = true;
            }
          }
        }
      }

      // loop over the whole board bottom to top and check if any falling cells cannot move down
      for (let row = droppedBoard.length - 1; row >= 0; row--) {
        for (let col = 0; col < droppedBoard[row].length; col++) {
          if (droppedBoard[row][col].value === 1 && droppedBoard[row][col].isFalling) {
            if (row === droppedBoard.length - 1 || (droppedBoard[row + 1][col].value === 1 && !droppedBoard[row + 1][col].isFalling)) {
              hasDropped = true;
              break;
            }

            droppedBoard[row + 1][col] = {
              value: droppedBoard[row][col].value,
              color: droppedBoard[row][col].color,
              isFalling: droppedBoard[row][col].isFalling,
            };
            droppedBoard[row][col] = {
              value: 0,
              color: '',
              isFalling: false,
            };
          }
        }
      }
    }

    return droppedBoard;
  }
}