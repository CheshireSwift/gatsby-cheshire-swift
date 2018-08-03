import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './ellenBoard';

interface GameState {
  history: Array<{ squares: string[]; clickedSquare?: number[] }>;
  stepNumber: number;
  xIsNext: boolean;
}
export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
    const winner: [string, number[]] = calculateWinner(current.squares);
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
    const computeStatus = () => {
      if (winner) {
        return 'Winner: ' + winner[0];
      } else if (current.squares.includes(null) === false) {
        return 'Tie: No available moves remaining';
      } else {
        return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    };
    const status = computeStatus();

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
            winningArray={createWinningArray(
              _.get(calculateWinner(history[this.state.stepNumber].squares), 1),
            )}
          />
        </div>
        <div className={css({ marginLeft: 20 })}>
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
function createWinningArray(winningSquares: Line | null): string[] {
  const winningArray = Array(9).fill('square');
  if (winningSquares) {
    for (let i = 0; i < 3; i++) {
      winningArray[winningSquares[i]] = 'winning square';
    }
  }
  return winningArray;
}
export default Game;
