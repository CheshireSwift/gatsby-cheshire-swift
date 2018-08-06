import * as React from 'react';
import Link from 'gatsby-link';
import Accordion from '../components/accordionDemo';
import { css } from 'emotion';

const myContent = [
  { title: 'title 1', content: 'text 1' },
  { title: 'title 2', content: 'text 2' },
  { title: 'title 3', content: 'text 3' },
];

const AccordionPage = () => (
  <div className={css({ fontFamily: 'Arial' })}>
    <h1>Accordion Demo</h1>
    <br />
    <Accordion content={myContent} />
    <br />
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default AccordionPage;
