import * as React from 'react';
import './ticTacToe.css';
import { css } from 'emotion';

interface SquareProps {
  isWinner: boolean;
  onClick: () => void;
  value: string;
}

interface RowProps {
  rowNum: number;
  squares: string[];
  winnerSquares: number[];
  onClick: (i: number) => void;
}

interface BoardProps {
  squares: string[];
  winnerSquares: number[];
  onClick: (i: number) => void;
}

interface ToggleProps {
  onClick: () => void;
  isToggleOn: boolean;
}

interface History {
  lastMove: number;
  squares: string[];
}

interface GameState {
  history: History[];
  isToggleOn: boolean;
  stepNumber: number;
  xIsNext: boolean;
}

const Square = (props: SquareProps) => {
  if (props.isWinner) {
    return (
      <button
        className={css`
          background: #ffa500;
          border: 1px solid #999;
          float: left;
          font-size: 24px;
          font-weight: bold;
          line-height: 34px;
          height: 34px;
          margin-right: -1px;
          margin-top: -1px;
          padding: 0;
          text-align: center;
          width: 34px;
        `}
        onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );
  } else {
    return (
      <button
        className={css(`
          background: #fff;
          border: 1px solid #999;
          float: left;
          font-size: 24px;
          font-weight: bold;
          line-height: 34px;
          height: 34px;
          margin-right: -1px;
          margin-top: -1px;
          padding: 0;
          text-align: center;
          width: 34px;
        `)}
        onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );
  }
};

const Row = (props: RowProps) => {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    const isWinner = props.winnerSquares
      ? props.winnerSquares.includes(3 * props.rowNum + i)
      : false;
    cells.push(
      renderSquare({
        isWinner,
        onClick: () => props.onClick(3 * props.rowNum + i),
        value: props.squares[3 * props.rowNum + i],
      }),
    );
  }
  return <div className="board-row">{cells}</div>;
};

function renderSquare(props: SquareProps): JSX.Element {
  return (
    <Square
      value={props.value}
      onClick={props.onClick}
      isWinner={props.isWinner}
    />
  );
}

const Board = (props: BoardProps) => {
  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push(
      <Row
        rowNum={i}
        squares={props.squares}
        winnerSquares={props.winnerSquares}
        onClick={props.onClick}
      />,
    );
  }

  return <div className="game-board">{rows}</div>;
};

const Toggle = (props: ToggleProps) => {
  return (
    <button onClick={() => props.onClick()}>
      {props.isToggleOn ? 'Ascending' : 'Descending'}
    </button>
  );
};

class Game extends React.Component<{ againstComputer: boolean }, GameState> {
  constructor(props: { againstComputer: boolean }) {
    super(props);
    this.state = {
      history: [
        {
          lastMove: null,
          squares: Array(9).fill(null),
        },
      ],
      isToggleOn: false,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          lastMove: i,
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

    // If it's the computer's turn
    // "Click" the appropriate button
    if (
      this.props.againstComputer &&
      !calculateWinner(squares) &&
      this.state.history.length !== 9
    ) {
      this.handleClick(
        calculateNextMove(
          this.state.history[this.state.history.length - 1].squares,
          false,
        ).index,
      );
    }
  }

  toggleHandler() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
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
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    const winnerSquares = calculateWinner(current.squares);
    const winner = !!winnerSquares ? current.squares[winnerSquares[0]] : null;
    let status = !!winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

    // Getting the right hand side buttons (which jumps to a move)
    const moves = history.map((move, moveNum) => {
      const colPos = move.lastMove % 3;
      const rowPos = Math.floor(move.lastMove / 3);
      const desc = moveNum
        ? `Go to move #${moveNum} (${colPos}, ${rowPos})`
        : 'Go to gamestart';
      if (moveNum === this.state.stepNumber) {
        return (
          <li key={moveNum}>
            <button onClick={() => this.jumpTo(moveNum)}>
              <b>{desc}</b>
            </button>
          </li>
        );
      }
      return (
        <li key={moveNum}>
          <button onClick={() => this.jumpTo(moveNum)}>{desc}</button>
        </li>
      );
    });
    if (this.state.isToggleOn) {
      moves.reverse();
    }

    // Check draw condition (win condition has already been checked)
    if (this.state.stepNumber === 9 && !winner) {
      status = 'Draw';
    }

    // Build up DOM
    return (
      <div
        className={css(`
        display: flex;
        flex-direction: row;`)}
      >
        <Board
          squares={current.squares}
          onClick={i => this.handleClick(i)}
          winnerSquares={winnerSquares}
        />
        <div
          className={css(`
            margin-left: 20px;
        `)}
        >
          <div>{status}</div>
          <ol
            className={css(`
              padding-left: 30px;

          `)}
          >
            {moves}
          </ol>
          <Toggle
            isToggleOn={this.state.isToggleOn}
            onClick={() => this.toggleHandler()}
          />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: string[]) {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
}

// Rteurns an array of the indicies of all occurances
function getAllIndexOF(arr: any[], val: any): number[] {
  const indicies = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indicies.push(i);
    }
  }
  return indicies;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(arr: any[]): any {
  return arr[getRandomInt(0, arr.length - 1)];
}

function notFasly(value: any): boolean {
  return !!value;
}

function notNull(value: any): boolean {
  return value !== null;
}

// Player is X
// Computer is O
function calculateNextMove(
  squares: string[],
  xIsNext: boolean,
): { maxOrMin: number; index: number } {
  // First check for winning states in recursion
  if (calculateWinner(squares)) {
    const max = squares[calculateWinner(squares)[0]] === 'X' ? -1 : 1;
    return { maxOrMin: max, index: null };
  }

  if (squares.filter(notFasly).length === 9) {
    return { maxOrMin: 0, index: null };
  }

  // If I have to make a move
  const weights = Array(squares.length).fill(null);
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      continue;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    weights[i] = calculateNextMove(newSquares, !xIsNext).maxOrMin;
  }

  const maxOrMin = xIsNext
    ? Math.min(...weights.filter(notNull))
    : Math.max(...weights.filter(notNull));
  const possibleMax = getAllIndexOF(weights, maxOrMin);
  const chosenOne = chooseRandom(possibleMax);
  return { maxOrMin, index: chosenOne };
}

// ========================================
module.exports = { Game, Square, Board, Row, calculateNextMove };
