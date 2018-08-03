import * as React from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';

const Nav = css({
  div: {
    maxWidth: 150,
    ':hover>div': {
      visibility: 'visible',
      opacity: 1,
      display: 'block',
      backgroundColor: 'hsl(270,50%,60%)',
    },
    div: {
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      transition: 'all 0.5s ease',
      marginTop: 0,
      display: 'none',
      maxWidth: 150,
      ':hover': {
        visibility: 'visible',
        opacity: 1,
        backgroundColor: 'hsl(270,50%,60%)',
        display: 'block',
      },
      a: {
        clear: 'both',
        width: '100%',
        maxWidth: 150,
        display: 'block',
      },
    },
  },
  a: {
    ':hover': { backgroundColor: 'hsl(270,50%,55%)' },
    color: 'white',
    display: 'inline-block',
    padding: '1em 1.0875rem',
    textDecoration: 'none',
    verticalAlign: 'middle',
  },
  margin: '0 auto',
  marginBottom: '1.45rem',
  maxWidth: 960,
  backgroundColor: 'hsl(270,50%,60%)',
  p: {
    ':hover': { backgroundColor: 'hsl(270,50%,55%)' },
    display: 'inline-block',
    color: 'white',
    padding: '1em 1.0875rem',
    maxWidth: 150,
    marginBottom: 0,
  },
});

export default class Navbar extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return (
      <div className={css({ backgroundColor: 'hsl(270,50%,60%)' })}>
        <nav className={Nav}>
          <Link to="/">Homepage</Link>
          <div className={css({ maxWidth: 150, display: 'inline-block' })}>
            <p>Ellen</p>
            <div>
              <Link to="/page-2">Tic-Tac-Toe</Link>
              <Link to="/charizard">Charizard</Link>
              <Link to="/longPage">Long Page</Link>
            </div>
          </div>

          <Link to="/page-3">Tic Tac Toe</Link>
          <Link to="/indexViktor">Viktor Tic Tac Toe</Link>
          <Link to="/psrh">Game of Life</Link>
          <Link to="/ultimate">Ultimate Tic-Tac-Toe</Link>
        </nav>
      </div>
    );
  }
}
