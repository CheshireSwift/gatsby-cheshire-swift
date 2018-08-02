import * as React from 'react';
import Link from 'gatsby-link';

export default () => (
  <div>
    <h1>Hi people</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/psrh/">Go to Game of Life</Link>
    <img src="/assets/charizard.png" height="300px" />
  </div>
);
