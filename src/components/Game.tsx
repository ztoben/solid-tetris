import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { getNextPiece } from '../utils/get-next-piece';
import { initializeBoard } from '../utils/initialize-board';
import { Board } from './Board';
import { Board as BoardType } from '../types';
import styles from './Game.module.css';
import { updateBoard } from '../utils/update-board';
import { NextPiecePreview } from './NextPiecePreview';
import { moveFallingShapeOnBoard } from '../utils/move-falling-piece';

export function Game(){
  const [intervalId, setIntervalId] = createSignal<number | undefined>(undefined);
  const [board, setBoard] = createSignal<BoardType | undefined>();
  const [gameOver, setGameOver] = createSignal(false);
  const [score, setScore] = createSignal(0);
  const [nextPiece, setNextPiece] = createSignal(getNextPiece());

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setBoard(moveFallingShapeOnBoard(board(), 'left'));
    } else if (event.key === 'ArrowRight') {
      setBoard(moveFallingShapeOnBoard(board(), 'right'));
    } else if (event.key === 'ArrowDown') {
      setBoard(moveFallingShapeOnBoard(board(), 'down'));
    } else if (event.key === 'ArrowUp' || event.key === 'x') {
      setBoard(moveFallingShapeOnBoard(board(), 'rotate-clockwise'));
    } else if (event.key === 'Control' || event.key === 'z') {
      setBoard(moveFallingShapeOnBoard(board(), 'rotate-counter-clockwise'));
    } else if (event.key === ' ') {
      setBoard(moveFallingShapeOnBoard(board(), 'drop'));
    }
  };

  onMount(() => {
    setBoard(initializeBoard());

    const intervalId = setInterval(() => {
      setBoard(updateBoard(board(), nextPiece(), setNextPiece, setGameOver, setScore, score()));
    }, 500);

    setIntervalId(intervalId);

    document.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    if (intervalId()) clearInterval(intervalId());

    document.removeEventListener('keydown', handleKeyDown);
  });

  const handleNewGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setScore(0);
    setNextPiece(getNextPiece());
  };

  return (
    <div class={styles.Game}>
      <Board board={board()} gameOver={gameOver()} />
      <div class={styles.InfoPanel}>
        <div class={styles.Score}>
          Score: {score()}
        </div>
        <NextPiecePreview nextPiece={nextPiece()} />
        <button class={styles.NewGameButton} onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}