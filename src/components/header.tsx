import * as React from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';

interface HeaderProps {
  siteTitle: string;
}

interface HeaderState {
  overrideTitle?: string;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { overrideTitle: null };
  }
  componentDidMount() {
    const url = 'https://pokeapi.co/api/v2/pokemon/charizard/';
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.setState({
          overrideTitle: `Charizard weighs ${data.weight / 10} kg`,
        });
      });
  }
  render() {
    return (
      <div
        className={css({
          background: 'rebeccapurple',
          marginBottom: 0,
        })}
      >
        <div
          className={css({
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
            textAlign: 'center',
          })}
        >
          <h1 className={css(`margin: 0`)}>
            <Link
              to="/"
              className={css({
                color: 'white',
                textDecoration: 'none',
              })}
            >
              Ultimate Tic-Tac-Toe
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default Header;
