import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'emotion';

interface SquareProps {
  buttonClass: string;
  onClick: () => void;
}

interface GameState {
  history: History[];
  stepNumber: number;
  redIsNext: boolean;
}

interface History {
  lastMove: number;
  squares: string[];
}

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

interface RowProps {
  rowNum: number;
  onClick: (i: number) => void;
  squares: string[];
}

interface RowCol {
  row: number;
  col: number;
}

const Square = (props: SquareProps) => {
  let backGroundColor = '#fff';
  switch (props.buttonClass) {
    case Player.YELLOW:
      backGroundColor = '#ffff00';
      break;
    case Player.RED:
      backGroundColor = '#ff0000';
      break;
  }
  return (
    <button
      className={css({
        background: backGroundColor,
        border: '1px solid #999',
        float: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 34,
        height: 34,
        marginRight: -1,
        marginTop: -1,
        padding: 0,
        textAlign: 'center',
        width: 34,
        '&:focus': {
          outline: 'none',
        },
      })}
      onClick={props.onClick}
    />
  );
};

const Player = Object.freeze({
  YELLOW: 'yellow-square',
  RED: 'red-square',
  EMPTY: 'empty-square',
});

function renderSquare(props: SquareProps): JSX.Element {
  return (
    <Square buttonClass={props.buttonClass} onClick={() => props.onClick()} />
  );
}

const Row = (props: RowProps) => {
  const cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      renderSquare({
        buttonClass: props.squares[7 * props.rowNum + i],
        onClick: () => props.onClick(7 * props.rowNum + i),
      }),
    );
  }
  return <div className="board-row">{cells}</div>;
};

const Board = (props: BoardProps) => {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(
      <Row rowNum={i} onClick={props.onClick} squares={props.squares} />,
    );
  }

  return <div>{rows}</div>;
};

class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill(Player.EMPTY),
          lastMove: null,
        },
      ],
      stepNumber: 0,
      redIsNext: true,
    };
  }

  handleClick(i: number) {
    // Get col and scan squares in it
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // If game is over
    if (calculateWinner(squares)) {
      return;
    }

    const colPosition = i % 7;
    let rowCursor = 6;
    for (let j = 0; j < 6; j++) {
      if (squares[colPosition + j * 7] === Player.EMPTY) {
        rowCursor = j;
      }
    }

    // Coloumn is full
    if (rowCursor === 6) {
      return;
    }

    const foundSquare = rowCursor * 7 + colPosition;
    squares[foundSquare] = this.state.redIsNext ? Player.RED : Player.YELLOW;
    this.setState({
      history: history.concat([
        {
          squares,
          lastMove: foundSquare,
        },
      ]),
      stepNumber: history.length,
      redIsNext: !this.state.redIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      redIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const nextPlayer = this.state.redIsNext ? 'RED' : 'YELLOW';
    const winner = calculateWinner(current.squares);
    const winnerColor = !!winner ? winner.winner : null;
    const winnerName = winnerColor === Player.RED ? 'RED' : 'YELLOW';
    let status = !!winnerColor
      ? `Winner: ${winnerName}`
      : `Next player: ${nextPlayer}`;
    if (winner) {
      console.log(winner.winnerSquares);
    }

    // Getting the right hand side buttons (which jumps to a move)
    const moves = history.map((move, moveNum) => {
      const colPos = move.lastMove % 7;
      const rowPos = Math.floor(move.lastMove / 7);
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
    // if (this.state.isToggleOn) {
    // 	moves.reverse();
    // }

    // Check draw condition (win condition has already been checked)
    if (this.state.stepNumber === 42 && !winner) {
      status = 'Draw';
    }

    // Build up DOM
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
        })}
      >
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div
          className={css({
            marginLeft: 20,
          })}
        >
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function rowColToInt(row: number, col: number): number {
  if (row < 0 || row > 6 || col < 0 || col > 6) {
    return;
  }
  return 7 * row + col;
}

function intToPos(i: number): RowCol {
  return { row: Math.floor(i / 7), col: i % 7 };
}

function scanFrom(
  start: RowCol,
  direction: RowCol,
  squares: string[],
  limit = 4,
) {
  if (
    !squares[rowColToInt(start.row, start.col)] ||
    squares[rowColToInt(start.row, start.col)] === Player.EMPTY
  ) {
    return;
  }
  const first = squares[rowColToInt(start.row, start.col)];
  const cursor = start;
  for (let i = 1; i < limit; i++) {
    cursor.row += direction.row;
    cursor.col += direction.col;
    if (
      !squares[rowColToInt(cursor.row, cursor.col)] ||
      squares[rowColToInt(cursor.row, cursor.col)] !== first
    ) {
      return;
    }
  }
  return first;
}

function calculateWinner(squares: string[]) {
  const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
  ];
  for (let i = 0; i < 42; i++) {
    for (const direction of directions) {
      if (scanFrom(intToPos(i), direction, squares)) {
        console.log(`Winner announced ${squares[i]}`);
        const winnerSquares = [];
        for (let k = 0; k < 4; k++) {
          const start = intToPos(i);
          winnerSquares.push(
            rowColToInt(
              start.row + direction.row * k,
              start.col + direction.col * k,
            ),
          );
        }
        return { winner: squares[i], winnerSquares };
      }
    }
  }
}

module.exports = { Game };
