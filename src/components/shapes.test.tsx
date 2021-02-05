import * as React from 'react';
import { render } from 'enzyme';

import { Nought, Cross } from './shapes';

describe('Nought', () => {
  it('matches the snaphot', () => {
    expect(render(<Nought />)).toMatchSnapshot();
  });
});

describe('cross', () => {
  it('Cross matches the snaphot', () => {
    expect(render(<Cross />)).toMatchSnapshot();
  });
});
