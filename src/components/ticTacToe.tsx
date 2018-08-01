import * as React from 'react';
import * as _ from 'lodash';
import Board from './board';
import { css } from 'emotion';

interface GameState {
  history: Array<{
    position?: { row: string; col: string };
    squares: Array<string | null>;
  }>;
  orderReverse: boolean;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
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
      history: history.concat([
        {
          position: this.calculatePosition(i),
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculatePosition(i: number) {
    const position = { row: '', col: '' };
    if (i % 3 === 0) {
      position.col = 'left';
    } else if (i % 3 === 1) {
      position.col = 'middle';
    } else {
      position.col = 'right';
    }

    if (0 <= i && i <= 2) {
      position.row = 'top';
    } else if (3 <= i && i <= 5) {
      position.row = 'middle';
    } else {
      position.row = 'bottom';
    }

    return position;
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
        ? 'Go to move #' +
          move +
          ': ' +
          person +
          ' in ' +
          step.position.row +
          ' row, ' +
          step.position.col +
          ' column'
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

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else if (this.state.stepNumber === 9) {
      status = 'Draw.';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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
            onClick={(i: number) => this.handleClick(i)}
            winStatus={winner}
          />
        </div>
        <div
          className={css({
            marginLeft: '20px',
          })}
        >
          <div>{status}</div>
          <br />
          <div>{results}</div>
          <button onClick={() => this.reverseOrder()}>Toggle order</button>
          <button
            className={css({ marginLeft: '20px' })}
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
