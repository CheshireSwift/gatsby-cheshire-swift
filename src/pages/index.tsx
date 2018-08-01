import * as React from 'react';
import { Board } from '../components/board';

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
