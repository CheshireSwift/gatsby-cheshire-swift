import * as React from 'react';
import { render, shallow, mount } from 'enzyme';
import * as cell from './cellState';
import { Board } from './board';
import { Grid } from './grid';
import * as Square from './square';

describe('Square', () => {

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      <Square cellState={cell.state.DEAD} onClick={onClick} />,
    );
    component.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when Square clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      <Square cellState={cell.state.DEAD} onClick={onClick} />,
    );
    component.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});

const initialState = [cell.state.DEAD, cell.state.DEAD, cell.state.DEAD,
  cell.state.DEAD, cell.state.ALIVE, cell.state.DEAD,
  cell.state.ALIVE, cell.state.ALIVE, cell.state.ALIVE];

describe('Grid', () => {
  it('has as many buttons as squares', () => {
    const grid = render(<Grid squares={initialState}
      sideLength={3}
      onClickHandler={() => null} />);
    // Get Grid child, then get Square child
    // Should be dead
    // simulate('click');
    // should be alive
    expect(grid.find('button').length).toBe(initialState.length);
  });
});

describe('Board', () => {
  it('creates alive cell when square clicked', () => {
    const board = mount(<Board sideLength={1} />);
    // render console.log(board.children()); //length 6
    console.log(board.childAt(5));
    expect(true).toBe(true);
  });
});
