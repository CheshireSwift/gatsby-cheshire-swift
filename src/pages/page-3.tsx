import * as React from 'react';
import Link from 'gatsby-link';
import Game from '../components/ticTacToe';
import { css } from 'emotion';

const GamePage = () => (
  <div className={css({ fontFamily: 'Arial' })}>
    <h1>Tic-Tac-Toe</h1>
    <Game />
    <br />
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default GamePage;
