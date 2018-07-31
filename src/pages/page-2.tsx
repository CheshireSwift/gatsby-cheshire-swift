import * as React from 'react';
import Link from 'gatsby-link';

import Game from '../components/tictactoe';

const SecondPage = () => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <Game />
  </div>
);

export default SecondPage;
