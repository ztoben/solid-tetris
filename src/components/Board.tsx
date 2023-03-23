import { Board as GameBoard } from "./../types";
import styles from "./Board.module.css";

interface BoardProps {
  board: GameBoard | undefined;
  gameOver: boolean;
}

export function Board(props: BoardProps) {
  return (
    <div class={styles.Board}>
      {props.gameOver && (
        <div class={styles.GameOver}>
          <span>Game Over</span>
        </div>
      )}
      {props.board?.map((row, rowIndex) => (
        row.map((cell, cellIndex) => (
          <div class={styles.Cell} style={{background: cell.color}}>
            {`${rowIndex}, ${cellIndex}`}
          </div>
        ))
      ))}
    </div>
  );
}