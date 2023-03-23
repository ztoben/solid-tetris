import { Piece } from "../types"
import styles from "./NextPiecePreview.module.css"

interface NextPiecePreviewProps {
  nextPiece: Piece;
}

export function NextPiecePreview(props: NextPiecePreviewProps) {
  return (
    <div class={styles.NextPiece}>
      Next Piece:
      <div
        class={styles.NextPiecePreview}
        style={{
          'grid-template-columns': `repeat(${props.nextPiece.shape[0].length}, 1fr)`,
          'grid-template-rows': `repeat(${props.nextPiece.shape.length}, 1fr)`,
        }}
      >
        {props.nextPiece.shape.map((row) => (
          row.map((cell) => (
            <div
              class={styles.NextPieceCell}
              style={{
                ...cell.value && {background: cell.color},
                ...!cell.value && {outline: 'none'},
              }}
            />
          ))
        ))}
      </div>
    </div>
  )
}