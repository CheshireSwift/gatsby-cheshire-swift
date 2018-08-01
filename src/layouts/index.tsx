import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/header';
import './index.css';
import styled, { css } from 'react-emotion';

interface LayoutProps {
  children: () => React.ReactChildren;
  data: { site: { siteMetadata: { title: string } } };
}

const navbarStyle = css({
  backgroundColor: '#c19ee5',
  height: 50,
  margin: 0,
  marginBottom: 50,
  padding: 0,
});

const navLinkStyle = css(
  {
    display: 'inline-block',
    height: 50,
    lineHeight: '50px',
    margin: 0,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  {
    ':hover': {
      background: '#decaf1',
      cursor: 'pointer',
      transition: 'background 0.5s',
    },
  },
);

const linkStyle = css({
  color: 'white',
  display: 'inline-block',
  height: 50,
  textDecoration: 'none',
});

const navSpacerStyle = css({
  color: 'white',
  display: 'inline-block',
  height: 50,
  lineHeight: '50px',
  margin: 0,
  padding: 0,
  paddingLeft: 20,
  paddingRight: 20,
  textDecoration: 'none',
});

const Layout = ({ children, data }: LayoutProps) => (
  <div
    className={css({
      fontFamily: 'georgia,serif',
      fontSize: '1.2em',
      overflowY: 'scroll',
    })}
  >
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div className={navbarStyle}>
      <div className={navLinkStyle}>
        <a className={linkStyle} href="../">
          Home
        </a>
      </div>
      <div className={navSpacerStyle}>•</div>
      <div className={navLinkStyle}>
        <a className={linkStyle} href="../page-2">
          Tic-Tac-Toe
        </a>
      </div>
      <div className={navSpacerStyle}>•</div>
      <div className={navLinkStyle}>
        <a className={linkStyle} href="../charizard">
          Charizard
        </a>
      </div>
      <div className={navSpacerStyle}>•</div>
      <div className={navLinkStyle}>
        <a className={linkStyle} href="../longPage">
          Long Page
        </a>
      </div>
    </div>
    <div
      className={css({
        margin: '0 auto',
        maxWidth: 960,
        padding: 0,
        paddingTop: 0,
      })}
    >
      {children()}
    </div>
    <div
      className={css({
        backgroundColor: '#decaf1',
        position: 'fixed',
        bottom: 35,
        height: 125,
        margin: 0,
        padding: 0,
        width: 4000,
      })}
    >
      <marquee
        className={css({ position: 'fixed', bottom: 17 })}
        scrollamount="20"
        direction="left"
        behavior="scroll"
      >
        <img
          className={css({
            height: 150,
            margin: 0,
          })}
          // src="/assets/charizardFly.gif"
          src="https://vignette.wikia.nocookie.net/projectcrusade/images/9/91/Flying_charizard_by_jameswolfsbane-d6c822w.gif/revision/latest?cb=20160406170752"
        />
      </marquee>
    </div>
    <div
      className={css({
        backgroundColor: '#c19ee5',
        position: 'fixed',
        bottom: 0,
        height: 35,
        margin: 0,
        padding: 0,
        width: 4000,
      })}
    />
  </div>
);
export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
