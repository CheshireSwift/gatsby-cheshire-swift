import * as React from 'react';
import * as _ from 'lodash';

const cellState = { DEAD: 'dead', ALIVE: 'alive' };

const Square = (props: any) => (
  <button className={props.value} onClick={props.onClick} >
  </button>
);

class Board extends React.Component {
  sideLength: number;
  state: any;
  constructor(props: any) {
    super(props);
    this.timestep = this.timestep.bind(this);
    this.sideLength = 50;
    this.state = {
      squares: Array(this.sideLength * this.sideLength).fill(cellState.DEAD),
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = cellState.ALIVE;
    this.setState({ squares });
  }

  renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  timestep() {
    // Figure out how many live neighbours each cell has
    // Any live cell with fewer than two live neighbors dies, as if by under population.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    console.log('step');
    const aliveNeighbourCount: number[] = [];
    this.state.squares.forEach((square: any, i: number) => {
      // grid offsets to neighbours
      const offsets: number[][] = [[-1, -1], [0, -1], [+1, -1], [-1, 0], [+1, 0], [-1, +1], [0, +1], [+1, +1]];
      let aliveNeighbours = 0;
      offsets.forEach(pair => {
        const [dx, dy] = pair;
        const [col, row] = [i % this.sideLength, Math.floor(i / this.sideLength)];
        const neighbour = { x: row + dx, y: col + dy };
        if (neighbour.x < 0 || neighbour.x >= this.sideLength
          || neighbour.y < 0 || neighbour.y >= this.sideLength) {
          // out of bounds
          return;
        }

        if (this.state.squares[neighbour.x * this.sideLength + neighbour.y] !== cellState.DEAD) {
          aliveNeighbours += 1;
        }
      });
      aliveNeighbourCount.push(aliveNeighbours);
    });

    // Once we have the number of live neighbours we can modify the state
    const newState = _.zipWith(this.state.squares, aliveNeighbourCount, (square, nLiveNeighbours: number) => {
      if (square === cellState.ALIVE) {
        return (nLiveNeighbours < 2 || nLiveNeighbours > 3) ? cellState.DEAD : cellState.ALIVE;
      } else {
        return (nLiveNeighbours === 3) ? cellState.ALIVE : cellState.DEAD;
      }
    });
    this.setState({ squares: newState });
    setTimeout(this.timestep, 500);
  }

  makeRow(i: number) {
    return (<div className="board-row">
      {_.range(i * this.sideLength, (i + 1) * this.sideLength).map((j: number) => this.renderSquare(j))}
    </div>
    );
  }

  render() {
    return (
      <div>
        <button className="timestep" onClick={() => this.timestep()}>Go!</button>
        {_.range(this.sideLength).map((row: number) => this.makeRow(row))}
      </div>
    );
  }
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
    </div>
  </div>
);

export default () => (
  <Game />
);
