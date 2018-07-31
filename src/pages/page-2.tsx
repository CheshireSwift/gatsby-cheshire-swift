import * as React from 'react';
import Link from 'gatsby-link';

import Game from '../components/tictactoe';

const SecondPage = () => (
  <div>
    <h1>Tic-Tac-Toe</h1>
    <p>
      A sensational interactive multiplayer experience bound to delight interns
      and computing professionals alike!
    </p>
    <div className="gameBox">
      <Game />
    </div>
  </div>
);

export default SecondPage;
