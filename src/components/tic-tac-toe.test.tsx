import 'jsdom-global/register'; // at the top of file , even  , before importing react
import * as React from 'react';
import { render, mount } from 'enzyme';
// import { JSDOM } from 'jsdom';
// const doc = JSDOM.jsdom('<!doctype html><html><body></body></html>'); // Needed for mounting

const TicTacToe = require('./tic-tac-toe');

describe('Tic-Tac-Toe module', () => {
  it('Expects baord to have 3 row children', () => {
    const onClick = (i: number) => i + 1;
    const board = render(
      <TicTacToe.Board
        squares={Array(9).fill(null)}
        onClick={onClick}
        winnerSquares={null}
      />,
    );
    expect(board.children()).toHaveLength(3);
  });

  it('Expects each row to have 3 children', () => {
    const row = render(
      <TicTacToe.Row
        rowNum={1}
        squares={Array(3).fill(null)}
        winnerSquares={null}
        onClick={(i: number) => i + 1}
      />,
    );
    expect(row.children()).toHaveLength(3);
  });

  it('Expects game to have the two right components', () => {
    const game = render(<TicTacToe.Game />);
    expect(game.children()).toHaveLength(2);
    expect(game).toContainSelector('div.game-board');
    expect(game).toContainSelector('div.game-info');
  });

  it('expects board to render the state properly', () => {
    const onClick = (i: number) => i + 1;
    const board = mount(
      <TicTacToe.Board
        squares={['X', 'O', 'X', null, null, 'O', 'O', null, 'X']}
        onClick={onClick}
        winnerSquares={null}
      />,
    );
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .text(),
    ).toEqual('X');
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(1)
        .text(),
    ).toEqual('O');
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(2)
        .text(),
    ).toEqual('X');
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(0)
        .text(),
    ).toEqual('');
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(1)
        .text(),
    ).toEqual('');
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(2)
        .text(),
    ).toEqual('O');
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(0)
        .text(),
    ).toEqual('O');
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(1)
        .text(),
    ).toEqual('');
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(2)
        .text(),
    ).toEqual('X');
  });

  it('expects board to display winning states', () => {
    const onClick = (i: number) => i + 1;
    const board = mount(
      <TicTacToe.Board
        squares={['X', 'O', 'X', null, 'X', 'O', 'O', null, 'X']}
        onClick={onClick}
        winnerSquares={[0, 4, 8]}
      />,
    );
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .prop('isWinner'),
    ).toEqual(true);
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(1)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(2)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(0)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(1)
        .prop('isWinner'),
    ).toEqual(true);
    expect(
      board
        .childAt(0)
        .childAt(1)
        .childAt(0)
        .childAt(2)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(0)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(1)
        .prop('isWinner'),
    ).toEqual(false);
    expect(
      board
        .childAt(0)
        .childAt(2)
        .childAt(0)
        .childAt(2)
        .prop('isWinner'),
    ).toEqual(true);
  });

  it('Test button click is registered', () => {
    const game = mount(<TicTacToe.Game />);
    const magicButton = game
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .childAt(2)
      .childAt(0)
      .childAt(0);
    magicButton.simulate('click');
    const expectedHistory: any = game.state('history');
    expect(expectedHistory[1].squares[6]).toEqual('X');
  });
});
