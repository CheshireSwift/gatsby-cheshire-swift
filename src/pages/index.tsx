import * as React from 'react';
import Link from 'gatsby-link';
import Game from '../components/tic-tac-toe';

export default () => (
  <div>
    <h1>Hi people</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <Game />
  </div>
);
