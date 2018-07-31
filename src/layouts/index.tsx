import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/header';
import './index.css';

interface LayoutProps {
  children: () => React.ReactChildren;
  data: { site: { siteMetadata: { title: string } } };
}

const Layout = ({ children, data }: LayoutProps) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />

    <div className="navbar">
      <ul>
        <li className="hover">
          <a href="../">Home</a>
        </li>
        <li className="spacer">•</li>
        <li className="hover">
          <a href="../page-2">Tic-Tac-Toe</a>
        </li>
        <li className="spacer">•</li>
        <li className="hover">
          <a href="../charizard">Charizard</a>
        </li>
      </ul>
    </div>

    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: 0,
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
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
