import * as React from 'react';
import Link from 'gatsby-link';
import { css } from '../../node_modules/emotion';

export default () => (
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
      charizard
    </h1>
    <img
      className={css({
        marginBottom: '1.45rem',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        maxWidth: '100%',
        padding: 0,
      })}
      alt="rawr"
      src="https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/500px-006Charizard.png"
    />
  </div>
);