import * as React from 'react';
import { render } from 'enzyme';
import * as cell from './cellState';

import * as life from './game-of-life';

describe('Generation advance function', () => {
  const evolve = life.computeNextGeneration([3], [2, 3]);
  it('preserves a cell', () => {
    const initialState = [cell.state.DEAD, cell.state.DEAD, cell.state.DEAD,
                          cell.state.DEAD, cell.state.ALIVE, cell.state.DEAD,
                          cell.state.ALIVE, cell.state.ALIVE, cell.state.ALIVE];
    const newState = evolve(initialState);
    expect(newState[4]).toEqual(cell.state.ALIVE);
  });

  it('kills a cell', () => {
    const initialState = [cell.state.DEAD, cell.state.DEAD, cell.state.DEAD,
                          cell.state.DEAD, cell.state.ALIVE, cell.state.DEAD,
                          cell.state.DEAD, cell.state.DEAD, cell.state.ALIVE];
    const newState = evolve(initialState);
    expect(newState[4]).toEqual(cell.state.DEAD);
  });
});
