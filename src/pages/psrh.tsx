import * as React from 'react';
import { Board } from '../components/philippa/game-of-life/board';
import { css } from 'emotion';

const Game = () => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'center',
    })}
  >
    <div>
      <p>
        Try some sample rules from{' '}
        <a href="https://en.wikipedia.org/wiki/Life-like_cellular_automaton">
          here
        </a>
      </p>
      <Board />
    </div>
  </div>
);

export default () => <Game />;
