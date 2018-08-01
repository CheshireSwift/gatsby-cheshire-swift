import * as React from 'react';
import Link from 'gatsby-link';
import { css } from '../../node_modules/emotion';

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
        })}
      >
        <div
          className={css({
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          })}
        >
          <h1
            className={css({
              color: 'inherit',
              fontFamily:
                'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              fontSize: '2.6em',
              fontWeight: 'bold',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: '0.45rem',
              marginTop: '0.45rem',
              padding: 0,
            })}
          >
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {this.state.overrideTitle || this.props.siteTitle}
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default Header;
