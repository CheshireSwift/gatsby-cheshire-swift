import * as React from 'react';
import Link from 'gatsby-link';
import Accordion from '../components/accordionDemo';
import { css } from 'emotion';

const myContent = [
  { title: 'Title 1', content: 'text 1' },
  {
    title: 'Title 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis accumsan convallis. Quisque libero lectus, egestas ut metus id, congue volutpat ex. Maecenas facilisis augue euismod egestas facilisis. Etiam nulla enim, bibendum quis dui sit amet, rhoncus fermentum risus. Nullam volutpat nisi dolor, id cursus risus gravida nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus molestie consectetur. Vivamus nec aliquet ligula, nec scelerisque sapien. Praesent convallis eros vitae ex pulvinar, id porta dui tempor. Integer pharetra urna dictum, dignissim leo vel, venenatis turpis. Vestibulum eget lorem cursus, consectetur mauris luctus, rutrum odio. Cras sit amet rhoncus elit, a porta velit. Nulla facilisi.',
  },
  { title: 'Title 3', content: 'text 3' },
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
