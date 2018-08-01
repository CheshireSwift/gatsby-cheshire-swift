import * as React from 'react';
import { render, shallow, mount } from 'enzyme';
import * as _ from 'lodash';

import * as ultimate from '../pages/ultimate';

describe('ultimate tic-tac-toe', () => {
  it('Nought matches the snaphot', () => {
    expect(render(<ultimate.Nought />)).toMatchSnapshot();
  });

  it('Cross matches the snaphot', () => {
    expect(render(<ultimate.Cross />)).toMatchSnapshot();
  });

  it('Square renders nothing with no winner', () => {
    const component = render(
      <ultimate.Square cell={{ winner: null }} onClick={() => null} />,
    ).get(0);
    expect(component.children).toEqual([]);
  });

  it('Square renders winner', () => {
    const component = render(
      <ultimate.Square
        cell={{ winner: ultimate.Winner.Cross }}
        onClick={() => null}
      />,
    );
    expect(component.find('svg').length).toBeGreaterThanOrEqual(1);
  });

  it('Square calls onClick when clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      <ultimate.Square cell={{ winner: null }} onClick={onClick} />,
    );
    component.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('SmallBoard has 9 Squares', () => {
    const component = render(
      <ultimate.SmallBoard
        available={true}
        board={{
          cells: Array<ultimate.Cell>(9).fill({ winner: null }),
          winner: null,
        }}
        handleClick={() => null}
      />,
    );
    expect(component.find('button').length).toBe(9);
  });

  it('SmallBoard accepts clicks if available', () => {
    const onClick = jest.fn();
    const component = shallow(
      <ultimate.SmallBoard
        available={true}
        board={{
          cells: Array<ultimate.Cell>(9).fill({ winner: null }),
          winner: null,
        }}
        handleClick={onClick}
      />,
    );
    component.childAt(0).simulate('click');
    expect(onClick).toHaveBeenCalledWith(0);
  });

  it('SmallBoard does not accepts clicks if not available', () => {
    const onClick = jest.fn();
    const component = shallow(
      <ultimate.SmallBoard
        available={false}
        board={{
          cells: Array<ultimate.Cell>(9).fill({ winner: null }),
          winner: null,
        }}
        handleClick={onClick}
      />,
    );
    component.childAt(0).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('SmallBoard displays squares with the correct winners', () => {
    const component = shallow(
      <ultimate.SmallBoard
        available={false}
        board={{
          cells: [
            { winner: ultimate.Winner.Cross },
            { winner: ultimate.Winner.Nought },
            ...Array(7).fill({ winner: null }),
          ],
          winner: null,
        }}
        handleClick={() => null}
      />,
    );
    expect(
      component.children().map(child => child.prop('cell').winner),
    ).toEqual([
      ultimate.Winner.Cross,
      ultimate.Winner.Nought,
      ...Array(7).fill(null),
    ]);
  });

  it('SmallBoard displays a winner', () => {
    const component = render(
      <ultimate.SmallBoard
        available={false}
        board={{
          cells: Array(9).fill({ winner: null }),
          winner: ultimate.Winner.Nought,
        }}
        handleClick={() => null}
      />,
    );
    expect(component.find('svg').length).toBe(1);
  });

  it('LargeBoard has 9 SmallBoards', () => {
    const component = render(
      <ultimate.LargeBoard
        available={[1, 2, 3, 4, 5, 6, 7, 8, 0]}
        boards={Array(9).fill({
          cells: Array(9).fill({ winner: null }),
          winner: null,
        })}
        handleClick={() => null}
      />,
    );
    expect(component.find('div').length).toBe(9);
  });

  it('LargeBoard passes click handler', () => {
    const handleClick = jest.fn();
    const component = shallow(
      <ultimate.LargeBoard
        available={[1, 2, 3, 4, 5, 6, 7, 8, 0]}
        boards={Array(9).fill({
          cells: Array(9).fill({ winner: null }),
          winner: null,
        })}
        handleClick={handleClick}
      />,
    );
    component.childAt(1).prop('handleClick')(20);
    expect(handleClick).toHaveBeenCalledWith(1, 20);
  });
});
