import React = require('react');
import { shallow, mount, render } from 'enzyme';

import * as TicTacToeBasic from '../components/tictactoe';

describe('Testing framework', () => {
  it('should render without throwing an error', () => {
    expect(render(<TicTacToeBasic.Game />)).toContainSelector(
      'div[class="gameboard"]',
    );
  });
  it('should render squares', () => {
    expect(render(<TicTacToeBasic.Game />)).toContainSelector(
      'button[class="square css-1nre2zt"]',
    );
  });
});
