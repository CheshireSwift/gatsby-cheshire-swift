import * as React from 'react';
import { render, shallow, mount } from 'enzyme';
import Game from './tictactoe';
describe('the status', () => {
  it('displays the next player at start', () => {
    const component = render(<Game />);
    expect(component.text()).toContain('Next player: X');
  });
  it('switches next player each turn', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        { squares: [null, null, null, null, null, null, null, null, null] },
        {
          clickedSquare: [1, 1],
          squares: ['X', null, null, null, null, null, null, null, null],
        },
      ],
      stepNumber: 1,
      xIsNext: false,
    });
    expect(component.text()).toContain('Next player: O');
  });
  it('displays the winner if appropriate', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        { squares: [null, null, null, null, null, null, null, null, null] },
        {
          clickedSquare: [1, 1],
          squares: ['X', null, null, null, null, null, null, null, null],
        },
        {
          clickedSquare: [2, 1],
          squares: ['X', 'O', null, null, null, null, null, null, null],
        },
        {
          clickedSquare: [2, 2],
          squares: ['X', 'O', null, null, 'X', null, null, null, null],
        },
        {
          clickedSquare: [3, 2],
          squares: ['X', 'O', null, null, 'X', 'O', null, null, null],
        },
        {
          clickedSquare: [3, 3],
          squares: ['X', 'O', null, null, 'X', 'O', null, null, 'X'],
        },
      ],
      stepNumber: 5,
      xIsNext: true,
    });
    expect(component.text()).toContain('Winner: X');
  });
  it('displays a message if a tie occurs', () => {
    const component = shallow(<Game />);
    component.setState({
      history: [
        { squares: [null, null, null, null, null, null, null, null, null] },
        {
          clickedSquare: [1, 1],
          squares: ['X', null, null, null, null, null, null, null, null],
        },
        {
          clickedSquare: [2, 1],
          squares: ['X', 'O', null, null, null, null, null, null, null],
        },
        {
          clickedSquare: [1, 3],
          squares: ['X', 'O', null, null, null, null, 'X', null, null],
        },
        {
          clickedSquare: [1, 2],
          squares: ['X', 'O', null, 'O', null, null, 'X', null, null],
        },
        {
          clickedSquare: [2, 2],
          squares: ['X', 'O', null, 'O', 'X', null, 'X', null, null],
        },
        {
          clickedSquare: [3, 3],
          squares: ['X', 'O', null, 'O', 'X', null, 'X', null, 'O'],
        },
        {
          clickedSquare: [3, 2],
          squares: ['X', 'O', null, 'O', 'X', 'X', 'X', null, 'O'],
        },
        {
          clickedSquare: [3, 1],
          squares: ['X', 'O', 'O', 'O', 'X', 'X', 'X', null, 'O'],
        },
        {
          clickedSquare: [2, 3],
          squares: ['X', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'O'],
        },
      ],
      stepNumber: 9,
      xIsNext: false,
    });
    expect(component.text()).toContain('Tie: No available moves remaining');
  });
});
