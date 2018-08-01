import * as React from 'react';
import Helmet from 'react-helmet';

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
        <option value={color} style={{ textTransform: 'capitalize' }}>
          {color}
        </option>
      );
    });

    return (
      <div>
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
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children()}
        </div>
        <div
          style={{
            padding: '0rem 16.55rem',
          }}
        >
          <label>
            Select header color:
            <select
              value={this.state.color}
              onChange={this.handleChange}
              style={{
                margin: '0 10px',
              }}
            >
              {colorList}
            </select>
          </label>
        </div>
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
