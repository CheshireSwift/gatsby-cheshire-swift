import * as React from 'react';

import { render } from 'enzyme';

import Header from './header';

describe('the header', () => {
  // it('matches the snapshot', () => {

  //   expect(render(<Header siteTitle="blah" />)).toMatchSnapshot();

  // });

  it('displays the title', () => {
    const title = 'Test Site Title Yay';

    const component = render(<Header siteTitle={title} color="white" />);

    expect(component.text()).toContain(title);
  });

  it('links to the homepage', () => {
    const component = render(<Header siteTitle="blah" color="white" />);

    expect(component).toContainSelector('a[href="/"]');
  });
});
