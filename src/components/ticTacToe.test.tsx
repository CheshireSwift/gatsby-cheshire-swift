import * as React from 'react';
import { render, shallow } from 'enzyme';

import Game from './ticTacToe';

describe('the game', () => {
  it('should alternate between players', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        {
          position: null,
          squares: [null, null, null, null, null, null, null, null, null],
        },
        {
          position: { row: 'middle', col: 'middle' },
          squares: [null, null, null, null, 'X', null, null, null, null],
        },
      ],
      orderReverse: false,
      stepNumber: 1,
      xIsNext: false,
    });
    expect(component.text()).not.toContain('Next player: X');
    expect(component.text()).toContain('Next player: O');
  });

  it('should display a result after the game ends', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        {
          position: null,
          squares: [null, null, null, null, null, null, null, null, null],
        },
        {
          position: { row: 'middle', col: 'middle' },
          squares: [null, null, null, null, 'X', null, null, null, null],
        },
        {
          position: { row: 'middle', col: 'right' },
          squares: [null, null, null, null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'top', col: 'middle' },
          squares: [null, 'X', null, null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'top', col: 'right' },
          squares: [null, 'X', 'O', null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'middle', col: 'bottom' },
          squares: [null, 'X', 'O', null, 'X', 'O', null, 'X', null],
        },
      ],
      orderReverse: false,
      stepNumber: 5,
      xIsNext: false,
    });
    expect(component.text()).toContain('Winner: X');
  });

  it('should not allow any more moves after game ends', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        {
          position: null,
          squares: [null, null, null, null, null, null, null, null, null],
        },
        {
          position: { row: 'middle', col: 'middle' },
          squares: [null, null, null, null, 'X', null, null, null, null],
        },
        {
          position: { row: 'middle', col: 'right' },
          squares: [null, null, null, null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'top', col: 'middle' },
          squares: [null, 'X', null, null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'top', col: 'right' },
          squares: [null, 'X', 'O', null, 'X', 'O', null, null, null],
        },
        {
          position: { row: 'middle', col: 'bottom' },
          squares: [null, 'X', 'O', null, 'X', 'O', null, 'X', null],
        },
      ],
      orderReverse: false,
      stepNumber: 5,
      xIsNext: false,
    });
    const textBefore = component.text();
    component
      .childAt(0)
      .childAt(0)
      .simulate('click');
    expect(component.text()).toStrictEqual(textBefore);
  });
});
