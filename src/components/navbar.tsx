import * as React from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';

const Nav = css({
  // Styles the nav unit itself
  margin: '0 auto',
  marginBottom: '1.45rem',
  maxWidth: 960,
  backgroundColor: 'hsl(270,50%,60%)',
  // Styles the overall dropdown including header, to keep inline in nav bar
  div: {
    maxWidth: 150,
    display: 'inline-block',
    // Styling causing the dropdown to appear when hover on its header
    ':hover>div': {
      visibility: 'visible',
      opacity: 1,
      display: 'block',
      backgroundColor: 'hsl(270,50%,60%)',
    }, // Styling of the dropdown, to make it default invisible
    div: {
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      transition: 'all 0.5s ease',
      marginTop: 0,
      display: 'none',
      maxWidth: 150,
      // Styling of the dropdown, to make it visible when hover on the dropdown
      ':hover': {
        visibility: 'visible',
        opacity: 1,
        backgroundColor: 'hsl(270,50%,60%)',
        display: 'block',
      }, // Styling of the links within the dropdown
      a: {
        clear: 'both',
        width: 120,
        display: 'block',
      },
    },
  }, // Styling of the links which do not have dropdown
  a: {
    ':hover': { backgroundColor: 'hsl(270,50%,55%)' },
    color: 'white',
    display: 'inline-block',
    padding: '1em 1.0875rem',
    textDecoration: 'none',
    verticalAlign: 'middle',
    width: 120,
    textAlign: 'center',
  }, // Styling of the header for each dropdown column
  p: {
    ':hover': { backgroundColor: 'hsl(270,50%,55%)' },
    display: 'inline-block',
    color: 'white',
    padding: '1em 1.0875rem',
    width: 120,
    marginBottom: 0,
    textAlign: 'center',
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
          <div>
            <p>Ellen</p>
            <div>
              <Link to="/ellenTTTPage">Tic-Tac-Toe</Link>
              <Link to="/charizard">Charizard</Link>
              <Link to="/longPage">Long Page</Link>
            </div>
          </div>
          <div>
            <p>Joanna</p>
            <div>
              <Link to="/joannaTTTPage">Tic Tac Toe</Link>
            </div>
          </div>
          <div>
            <p>Viktor</p>
            <div>
              <Link to="/indexViktor">Viktor Tic Tac Toe</Link>
            </div>
          </div>
          <div>
            <p>Philippa</p>
            <div>
              <Link to="/psrh">Game of Life</Link>
            </div>
          </div>
          <div>
            <p>Jack</p>
            <div>
              <Link to="/ultimate">Ultimate Tic-Tac-Toe</Link>
            </div>
          </div>
          <div>
            <p>Peter</p>
            <div>{/* Links go here */}</div>
          </div>
        </nav>
      </div>
    );
  }
}
