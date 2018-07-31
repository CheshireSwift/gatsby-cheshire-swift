import * as React from 'react';
import * as _ from 'lodash';

enum cellState { DEAD, ALIVE }
const cellClass = {
  [cellState.DEAD]: 'dead',
  [cellState.ALIVE]: 'alive',
};

const TimeControl = (props: { onClickHandler: () => void, value: string }) => {
  return (
    <button onClick={props.onClickHandler}>{props.value}</button>
  );
};

interface SquareProps {
  styleClass: string;
  onClickHandler: () => void;
}

const Square = (props: SquareProps) => (
  <button className={props.styleClass} onClick={props.onClickHandler} >
  </button>
);

interface BoardState {
  squares: cellState[];
  isRunning: boolean;
  timerToken: Timer;
}

class Board extends React.Component<{}, BoardState> {
  sideLength: number;
  constructor(props: {}) {
    super(props);
    this.computeNextGeneration = this.computeNextGeneration.bind(this);
    this.sideLength = 50;
    this.state = {
      isRunning: false,
      squares: Array(this.sideLength * this.sideLength).fill(cellState.DEAD),
      timerToken: 0,
    };
  }

  createAliveCell(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = cellState.ALIVE;
    this.setState({ squares });
  }

  renderSquare(i: number) {
    return (
      <Square
        key={i}
        styleClass={cellClass[this.state.squares[i]]}
        onClickHandler={() => this.createAliveCell(i)}
      />
    );
  }

  buttonText() {
    return (this.state.isRunning ? 'Stop' : 'Go');
  }

  computeNextGeneration() {
    // Figure out how many live neighbours each cell has
    const aliveNeighbourCount: number[] = [];
    this.state.squares.forEach((square: cellState, i: number) => {
      // For each grid offset of a neighbour...
      const offsets: number[][] = [[-1, -1], [0, -1], [+1, -1], [-1, 0], [+1, 0], [-1, +1], [0, +1], [+1, +1]];
      let aliveNeighbours = 0;
      offsets.forEach(pair => {
        const [dx, dy] = pair;
        const [col, row] = [i % this.sideLength, Math.floor(i / this.sideLength)];
        const neighbour = { x: row + dx, y: col + dy };
        if (neighbour.x < 0 || neighbour.x >= this.sideLength
          || neighbour.y < 0 || neighbour.y >= this.sideLength) {
          // Neighbour cell is out of bounds, ignore
          return;
        }

        if (this.state.squares[neighbour.x * this.sideLength + neighbour.y] !== cellState.DEAD) {
          aliveNeighbours += 1;
        }
      });
      aliveNeighbourCount.push(aliveNeighbours);
    });

    // Once we have the number of live neighbours we can modify the state
    const newState = _.zipWith(this.state.squares, aliveNeighbourCount,
      (square: cellState, nLiveNeighbours: number) => {
        if (square === cellState.ALIVE) {
          // Any live cell with fewer than two live neighbors dies, as if by under population.
          // Any live cell with two or three live neighbors lives on to the next generation.
          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          return (nLiveNeighbours < 2 || nLiveNeighbours > 3) ? cellState.DEAD : cellState.ALIVE;
        } else {
          // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
          return (nLiveNeighbours === 3) ? cellState.ALIVE : cellState.DEAD;
        }
      });
    this.setState({ squares: newState });
  }

  makeRowOfSquares(i: number) {
    return (<div className="board-row">
      {_.range(i * this.sideLength, (i + 1) * this.sideLength).map((j: number) => this.renderSquare(j))}
    </div>
    );
  }

  alternateAnimation() {
    if (!this.state.isRunning) {
      const id = setInterval(this.computeNextGeneration, 500);
      this.setState({ timerToken: id });
    } else {
      clearInterval(this.state.timerToken);
    }
    this.setState({ isRunning: !this.state.isRunning });
  }
  render() {
    return (
      <div>
        <TimeControl onClickHandler={this.alternateAnimation.bind(this)} value={this.buttonText()} />
        {_.range(this.sideLength).map((row: number) => this.makeRowOfSquares(row))}
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
