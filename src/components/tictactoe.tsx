import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

function Square(props: {
  value: string;
  onClick: () => void;
  isWinning: string;
}) {
  return (
    <button
      className={css(
        {
          backgroundColor:
            props.isWinning === 'winning square' ? 'lightgreen' : 'white',
          border: '1px solid #999',
          float: 'left',
          font: 'inherit',
          fontSize: '30px',
          fontWeight: 'bold',
          height: '50px',
          lineHeight: '34px',
          margin: 0,
          marginRight: '-1px',
          marginTop: '-1px',
          overflow: 'visible',
          padding: 0,
          textAlign: 'center',
          textTransform: 'none',
          width: '50px',
        },
        { ':focus': { outline: 'none' } },
      )}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
  winningArray: string[];
}

class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinning={this.props.winningArray[i]}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface GameState {
  history: Array<{ squares: string[]; clickedSquare?: number[] }>;
  stepNumber: number;
  xIsNext: boolean;
}

// tslint:disable-next-line:max-classes-per-file
export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
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
          clickedSquare: [Math.floor((i % 3) + 1), Math.floor(i / 3 + 1)],
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map(
      (step: { squares: string[]; clickedSquare: number[] }, move: number) => {
        const clickedSquare = step.clickedSquare;
        const desc = move
          ? `Go to move #${move} (Col: ${clickedSquare[0]} Row:${
              clickedSquare[1]
            })`
          : 'Go to game start';
        return (
          <li key={move}>
            <button
              className={css(
                {
                  font: 'inherit',
                  margin: 3,
                  overflow: 'visible',
                  textTransform: 'none',
                },
                { ':focus': { fontWeight: 'bold' } },
              )}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      },
    );

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else if (current.squares.includes(null) === false) {
      status = 'Tie: No available moves remaining';
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
            onClick={i => this.handleClick(i)}
            winningArray={createWinningArray(
              calculateWinner(history[this.state.stepNumber].squares),
            )}
          />
        </div>

        <div className={css({ 'margin-left': '20px' })}>
          <div>{status}</div>
          <div
            className={css({
              float: 'right',
              marginBottom: '20px',
              marginLeft: '300px',
            })}
          >
            <ol
              className={css({
                display: 'flex',
                flexDirection: 'column',
                listStyleImage: 'none',
                listStylePosition: 'outside',
                marginBottom: '1.45rem',
                marginLeft: '1.45rem',
                marginRight: 0,
                marginTop: 0,
                padding: 0,
              })}
            >
              {moves}
            </ol>
            &ensp;&ensp;Toggle list order &ensp;
            <input type="checkbox" id="toggle" className="toggle" />
          </div>
          {/* <button onClick={() => reverseOrder(moves)}>
            Toggle list order
          </button> */}
        </div>
      </div>
    );
  }
}

// ========================================

type Line = [number, number, number];

function calculateWinner(squares: string[]): [string, Line] {
  const lines: Line[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningLine = _.find(
    lines,
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c],
  );
  return winningLine ? [squares[winningLine[0]], winningLine] : null;
}

function createWinningArray(winningSquares: [string, Line] | null): string[] {
  const winningArray = Array(9).fill('square');
  if (winningSquares) {
    for (let i = 0; i < 3; i++) {
      winningArray[winningSquares[1][i]] = 'winning square';
    }
  }
  return winningArray;
}

export default Game;
