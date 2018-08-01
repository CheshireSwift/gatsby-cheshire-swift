import * as React from 'react';
import Link from 'gatsby-link';

import Game from '../components/tictactoe';
import { css } from '../../node_modules/emotion';

const SecondPage = () => (
  <div>
    <h1
      className={css({
        "color": 'inherit',
        'font-family':
          'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        'font-size': '2em',
        'font-weight': 'bold',
        'line-height': 1.1,
        "margin": 0,
        'margin-bottom': '1.45rem',
        'margin-top': '1.45rem',
        "padding": 0,
      })}
    >
      Tic-Tac-Toe
    </h1>
    <p
      className={css({
        "margin": 0,
        'margin-bottom': '1.45rem',
        "padding": 0,
      })}
    >
      A sensational interactive multiplayer experience bound to delight interns
      and computing professionals alike!
    </p>
    <div
      className={css({
        'background-color': '#decaf1',
        "border": '2px solid #3d1661',
        "margin": '10px',
        "padding": '10px',
      })}
    >
      <Game />
    </div>
  </div>
);

export default SecondPage;
