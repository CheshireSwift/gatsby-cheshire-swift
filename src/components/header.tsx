import * as React from 'react';
import Link from 'gatsby-link';

interface HeaderProps {
  siteTitle: string;
  color: string;
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
        style={{
          background: 'rebeccapurple',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: this.props.color,
                textDecoration: 'overline underline white',
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
