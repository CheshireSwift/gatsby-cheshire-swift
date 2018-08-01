import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';

const PageDiv = styled('div')`
  background: rebeccapurple;
  marginbottom: 1.45rem;
`;

const MarginDiv = styled('div')`
  margin: 0 auto;
  maxwidth: 960;
  padding: 1.45rem 1.0875rem;
`;

const H1Styled = styled('h1')`
  margin: 0;
`;

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
      <PageDiv>
        <MarginDiv>
          <H1Styled>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {this.state.overrideTitle || this.props.siteTitle}
            </Link>
          </H1Styled>
        </MarginDiv>
      </PageDiv>
    );
  }
}

export default Header;
