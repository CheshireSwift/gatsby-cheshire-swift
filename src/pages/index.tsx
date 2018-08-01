import * as React from 'react';
import { Board } from '../components/board';

const Game = () => (
  <div className="game">
    <div className="game-board">
      <p>Try some sample rules from <a href="https://en.wikipedia.org/wiki/Life-like_cellular_automaton">here</a></p>
      <Board />
    </div>
    <div className="game-info">
    </div>
  </div>
);

export default () => (
  <Game />
);
