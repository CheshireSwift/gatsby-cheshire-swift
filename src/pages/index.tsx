import * as React from 'react';
import Link from 'gatsby-link';

export default () => (
  <div>
    <p>
      <Link to="/ticTacToe-2p/">Play against a friend</Link>
    </p>
    <p>
      <Link to="/ticTacToe-1p/">Play against the computer</Link>
    </p>
  </div>
);
