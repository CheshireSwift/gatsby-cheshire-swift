import * as React from 'react';
import Link from 'gatsby-link';
import { css } from '../../node_modules/emotion';

export default () => (
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
      Hi people
    </h1>
  </div>
);
