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
          squares: ['X', null, null, null, null, null, null, null, null],
          clickedSquare: [1, 1],
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
          squares: ['X', null, null, null, null, null, null, null, null],
          clickedSquare: [1, 1],
        },
        {
          squares: ['X', 'O', null, null, null, null, null, null, null],
          clickedSquare: [2, 1],
        },
        {
          squares: ['X', 'O', null, null, 'X', null, null, null, null],
          clickedSquare: [2, 2],
        },
        {
          squares: ['X', 'O', null, null, 'X', 'O', null, null, null],
          clickedSquare: [3, 2],
        },
        {
          squares: ['X', 'O', null, null, 'X', 'O', null, null, 'X'],
          clickedSquare: [3, 3],
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
          squares: ['X', null, null, null, null, null, null, null, null],
          clickedSquare: [1, 1],
        },
        {
          squares: ['X', 'O', null, null, null, null, null, null, null],
          clickedSquare: [2, 1],
        },
        {
          squares: ['X', 'O', null, null, null, null, 'X', null, null],
          clickedSquare: [1, 3],
        },
        {
          squares: ['X', 'O', null, 'O', null, null, 'X', null, null],
          clickedSquare: [1, 2],
        },
        {
          squares: ['X', 'O', null, 'O', 'X', null, 'X', null, null],
          clickedSquare: [2, 2],
        },
        {
          squares: ['X', 'O', null, 'O', 'X', null, 'X', null, 'O'],
          clickedSquare: [3, 3],
        },
        {
          squares: ['X', 'O', null, 'O', 'X', 'X', 'X', null, 'O'],
          clickedSquare: [3, 2],
        },
        {
          squares: ['X', 'O', 'O', 'O', 'X', 'X', 'X', null, 'O'],
          clickedSquare: [3, 1],
        },
        {
          squares: ['X', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'O'],
          clickedSquare: [2, 3],
        },
      ],
      stepNumber: 9,
      xIsNext: false,
    });
    expect(component.text()).toContain('Tie: No available moves remaining');
  });
});

// Test: that enters correct O/X when square clicked (mount)
// Test: that displays correct number of past moves
// Test: that clicking past move returns to that point
// Test: that subsequently making a move resets history

// A lesson from Sam:

// const Blah = () => <div><OtherComponent /></div>

// const OtherComponent = () => <p>Hi</p>

// render(<Blah />)
// <div><p>Hi</p></div>

// shallow(<Blah />)
// <div><OtherComponent a="b"/><div>
// shallow(<Blah />).find(OtherComponent).prop('a')

// mount(<Blah />)
// <div><OtherComponent><p>Hi</p></OtherComponent></div>

// const myComponent = mount(<Blah />)
// myComponent.find('button').click()
// myComponent.simulate()
// expect(myComponent.text()).toContain('I was clicked')

// class GameRunner
// render() {
//     <ButtonsGoHere onClick={this.handleClicks}/>
//     <GameDisplay gameState={[['0', 'X', ' '], ...]}
// }

// comp.find(GameDisplay).props('gameState')

// const GameDisplay = (props) => <div>{props.gameState[0][1]}</div>

// expect(render(<GameDisplay gameState={[['0', 'X', ' ']]} />).text()).toBe('0X')

// expect(render(<GameDisplay gameState={[['0', 'X', 'X']]} />).text()).toBe('0XX')
