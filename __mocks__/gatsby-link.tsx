import * as React from 'react';
import { GatsbyLinkProps } from 'gatsby-link';

const Link: {
  default: React.SFC<GatsbyLinkProps>;
} = jest.genMockFromModule('gatsby-link');

Link.default = (props: GatsbyLinkProps) => (
  <a href={props.to as string} className={props.className}>
    {props.children}
  </a>
);

module.exports = Link;
