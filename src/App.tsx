import type { Component } from 'solid-js';

import styles from './App.module.css';
import { Game } from './components/Game';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <h1>SolidJS Tetris</h1>
      <Game />
    </div>
  );
};

export default App;
