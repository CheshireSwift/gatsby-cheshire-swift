import * as React from 'react';
import Link from 'gatsby-link';

import Game from '../components/tictactoe';
import { css } from '../../node_modules/emotion';

const SecondPage = () => (
  <div>
    <h1
      className={css({
        color: 'inherit',
        fontFamily:
          'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        fontSize: '2em',
        fontWeight: 'bold',
        lineHeight: 1.1,
        margin: 0,
        marginBottom: '1.45rem',
        marginTop: '1.45rem',
        padding: 0,
      })}
    >
      Tic-Tac-Toe
    </h1>
    <p
      className={css({
        margin: 0,
        marginBottom: '1.45rem',
        padding: 0,
      })}
    >
      A sensational interactive multiplayer experience bound to delight interns
      and computing professionals alike!
    </p>
    <div
      className={css({
        backgroundColor: '#decaf1',
        border: '2px solid #3d1661',
        margin: '10px',
        padding: '10px',
      })}
    >
      <Game />
    </div>
  </div>
);

export default SecondPage;
