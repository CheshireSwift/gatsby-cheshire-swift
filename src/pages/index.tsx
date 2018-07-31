import * as React from 'react';
import { Board } from './board';

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
    </div>
  </div>
);

export default () => (
  <Game />
);
