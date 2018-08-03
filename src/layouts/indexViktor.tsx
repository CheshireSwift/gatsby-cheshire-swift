import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/viktorHeader';
import './indexViktor.css';

interface LayoutProps {
  children: () => React.ReactChildren;
  data: { site: { siteMetadata: { title: string } } };
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header siteTitle="Ultimate Tic Tac Toe" />
    <div
      style={{
        margin: '0 auto',
        padding: 0,
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
);

export default Layout;
