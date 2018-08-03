import * as React from 'react';
import Helmet from 'react-helmet';
import { css } from 'emotion';

import Header from '../components/header';
import './index.css';

interface LayoutProps {
  children: () => React.ReactChildren;
  data: { site: { siteMetadata: { title: string } } };
}
interface LayoutState {
  color: string;
}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = { color: 'white' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ color: event.target.value });
  }

  render() {
    const colors = ['white', 'orange', 'violet', 'silver'];
    const colorList = colors.map(color => {
      return (
        <option value={color} key={color}>
          {color}
        </option>
      );
    });

    const Nav = css(
      {
        margin: '0 auto',
        marginBottom: '1.45rem',
        maxWidth: 960,
      },
      {
        '& a': {
          color: 'white',
          display: 'table-cell',
          padding: '1em 1.0875rem',
          textDecoration: 'none',
          verticalAlign: 'middle',
        },
      },
      {
        '& a:hover': { backgroundColor: 'hsl(270,50%,55%)' },
      }
    );

    return (
      <div
        className={css({
          fontFamily: 'Arial',
        })}
      >
        <Helmet
          title={this.props.data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header
          siteTitle={this.props.data.site.siteMetadata.title}
          color={this.state.color}
        />
        <div className={css({ backgroundColor: 'hsl(270,50%,60%)' })}>
          <nav className={Nav}>
            <a href="/">Homepage</a>
            <a href="/page-2">Ellen Tic-Tac-Toe</a>
            <a href="/page-3">Tic Tac Toe</a>
            <a href="/indexViktor">Viktor Tic Tac Toe</a>
            <a href="/charizard">Charizard</a>
            <a href="/longPage">Long page</a>
            <a href="/psrh">Game of Life</a>
          </nav>
        </div>
        <div
          className={css({
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
            marginBottom: 130,
          })}
        >
          {this.props.children()}
        </div>
        <div
          className={css({
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
          })}
        >
          <label>
            Select header color:
            <select
              value={this.state.color}
              onChange={this.handleChange}
              className={css({
                margin: '0 10px',
              })}
            >
              {colorList}
            </select>
          </label>
        </div>

        <div
          className={css({
            backgroundColor: '#decaf1',
            position: 'fixed',
            bottom: 25,
            height: 90,
            margin: 0,
            padding: 0,
            width: '100%',
            display: 'block',
            borderTop: '1px solid #3d1661',
          })}
        >
          <marquee
            behavior="scroll"
            className={css({
              bottom: 17,
              position: 'fixed',
            })}
            direction="left"
            scrollamount="20"
          >
            <img
              className={css({
                height: 90,
                margin: 0,
              })}
              // src="/assets/charizardFly.gif"
              src={
                'https://vignette.wikia.nocookie.net/' +
                'projectcrusade/images/9/91/Flying_charizard_by_jameswolfsbane-d6c822w.gif/' +
                'revision/latest?cb=20160406170752'
              }
            />
          </marquee>
        </div>
        <div
          className={css({
            backgroundColor: '#c19ee5',
            bottom: 0,
            height: 25,
            margin: 0,
            padding: 0,
            position: 'fixed',
            width: '100%',
            display: 'block',
          })}
        />
      </div>
    );
  }
}

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
