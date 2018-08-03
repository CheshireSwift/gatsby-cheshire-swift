import * as React from 'react';
import { css } from '../../node_modules/emotion';

const NotFoundPage = () => (
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
      NOT FOUND
    </h1>
    <p
      className={css({
        "margin": 0,
        'margin-bottom': '1.45rem',
        "padding": 0,
      })}
    >
      You just hit a route that doesn&#39;t exist... the sadness.
    </p>
  </div>
);

export default NotFoundPage;
