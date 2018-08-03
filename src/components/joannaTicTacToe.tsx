import * as React from 'react';
import * as _ from 'lodash';
import Board from './JOCboard';
import { css } from 'emotion';

type FilldSpace = 'X' | 'O';

interface GameState {
  history: Array<{
    position?: { row: string; col: string };
    squares: Array<FilldSpace | null>;
  }>;
  orderReverse: boolean;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      history: [
        {
          position: null,
          squares: Array(9).fill(null),
        },
      ],
      orderReverse: false,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { position: this.calculatePosition(i), squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculatePosition(i: number) {
    return {
      col: ['left', 'middle', 'right'][i % 3],
      row: ['top', 'middle', 'bottom'][Math.floor(i / 3)],
    };
  }

  computeStatus(winner) {
    if (winner) {
      return 'Winner: ' + winner[0];
    } else if (this.state.stepNumber === 9) {
      return 'Draw.';
    } else {
      return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  reverseOrder() {
    this.setState({
      orderReverse: !this.state.orderReverse,
    });
  }

  resetGame() {
    this.setState({
      history: [
        {
          position: null,
          squares: Array(9).fill(null),
        },
      ],
      orderReverse: false,
      stepNumber: 0,
      xIsNext: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const person = move % 2 === 0 ? 'O' : 'X';
      const desc = move
        ? `Go to move # ${move}: ${person} in ${step.position.row} row, ${
            step.position.col
          } column`
        : 'Go to game start';

      return (
        <li key={move}>
          <button
            className={css({
              fontWeight: move === this.state.stepNumber ? 'bold' : 'normal',
            })}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let results;
    if (!this.state.orderReverse) {
      results = <ol>{moves}</ol>;
    } else {
      results = <ol reversed>{moves.reverse()}</ol>;
    }

    const status = this.computeStatus(winner);

    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
        })}
      >
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={this.handleClick}
            winStatus={winner}
          />
        </div>
        <div
          className={css({
            marginLeft: 20,
          })}
        >
          <div>{status}</div>
          <br />
          <div>{results}</div>
          <button onClick={() => this.reverseOrder()}>Toggle order</button>
          <button
            className={css({ marginLeft: 20 })}
            onClick={() => this.resetGame()}
          >
            Reset game
          </button>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares: string[]): Array<number | string> {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const list: number[] = _.range(lines.length);
  for (const i of list) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], ...lines[i]];
    }
  }
  return null;
}
