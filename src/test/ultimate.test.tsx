import * as React from 'react';
import { render, shallow } from 'enzyme';

import {
  Square,
  Cell,
  Winner,
  SmallBoard,
  LargeBoard,
} from '../pages/ultimate';

describe('ultimate tic-tac-toe', () => {
  it('Square renders nothing with no winner', () => {
    const component = render(
      <Square cell={{ player: null }} onClick={() => null} />,
    ).get(0);
    expect(component.children).toEqual([]);
  });

  it('Square renders winner', () => {
    const component = render(
      <Square cell={{ player: Winner.Cross }} onClick={() => null} />,
    );
    expect(component).toContainSelector('svg');
  });

  it('Square calls onClick when clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      <Square cell={{ player: null }} onClick={onClick} />,
    );
    component.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('SmallBoard has 9 Squares', () => {
    const component = render(
      <SmallBoard
        available={true}
        board={{
          cells: Array<Cell>(9).fill({ player: null }),
        }}
        handleClick={() => null}
      />,
    );
    expect(component.find('button').length).toBe(9);
  });

  it('SmallBoard accepts clicks if available', () => {
    const onClick = jest.fn();
    const component = shallow(
      <SmallBoard
        available={true}
        board={{
          cells: Array<Cell>(9).fill({ player: null }),
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
      <SmallBoard
        available={false}
        board={{
          cells: Array<Cell>(9).fill({ player: null }),
        }}
        handleClick={onClick}
      />,
    );
    component.childAt(0).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('SmallBoard displays squares with the correct winners', () => {
    const component = shallow(
      <SmallBoard
        available={false}
        board={{
          cells: [
            { player: Winner.Cross },
            { player: Winner.Nought },
            ...Array(7).fill({ player: null }),
          ],
        }}
        handleClick={() => null}
      />,
    );
    expect(
      component.children().map(child => child.prop('cell').player),
    ).toEqual([Winner.Cross, Winner.Nought, ...Array(7).fill(null)]);
  });

  it('SmallBoard displays a winner', () => {
    const component = render(
      <SmallBoard
        available={false}
        board={{
          cells: Array(9).fill({ player: Winner.Cross }),
        }}
        handleClick={() => null}
      />,
    );
    expect(component.find('svg')).toHaveLength(10);
  });

  it('LargeBoard has 9 SmallBoards', () => {
    const component = render(
      <LargeBoard
        available={[1, 2, 3, 4, 5, 6, 7, 8, 0]}
        boards={Array(9).fill({
          cells: Array(9).fill({ player: null }),
        })}
        handleClick={() => null}
      />,
    );
    expect(component.find('div')).toHaveLength(9);
  });

  it('LargeBoard passes click handler', () => {
    const handleClick = jest.fn();
    const component = shallow(
      <LargeBoard
        available={[1, 2, 3, 4, 5, 6, 7, 8, 0]}
        boards={Array(9).fill({
          cells: Array(9).fill({ player: null }),
        })}
        handleClick={handleClick}
      />,
    );
    component.childAt(1).prop('handleClick')(20);
    expect(handleClick).toHaveBeenCalledWith(1, 20);
  });
});
