import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

enum Winner {
  Nought,
  Cross,
  Draw,
}

interface Cell {
  winner: Nullable<Winner>;
}

interface Board extends Cell {
  cells: Cell[];
}

interface GameState {
  available: number[];
  boards: Board[];
  xIsNext: boolean;
}

export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      available: _.range(9),
      boards: _.times(9, i => ({
        cells: _.times(9, j => ({ winner: null })),
        winner: null,
      })),
      xIsNext: true,
    };
  }

  handleClick(i: number, j: number) {
    const boards = this.state.boards.slice();
    boards[i] = {
      cells: boards[i].cells.slice(),
      winner: boards[i].winner,
    };
    if (boards[i].winner !== null || boards[i].cells[j].winner !== null) {
      return;
    }
    boards[i].cells[j].winner = this.state.xIsNext
      ? Winner.Cross
      : Winner.Nought;
    const winner = this.calculateWinner(boards[i].cells);
    let available: number[];
    boards[i].winner = winner;
    if (this.calculateWinner(boards) !== null) {
      available = [];
    } else {
      available =
        boards[j].winner !== null
          ? _.range(9).filter(board => boards[board].winner === null)
          : [j];
    }
    this.setState(prevState => ({
      available,
      boards,
      xIsNext: !prevState.xIsNext,
    }));
  }

  calculateWinner(squares: Cell[]): Nullable<Winner> {
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
      if (
        squares[a].winner !== null &&
        squares[a].winner === squares[b].winner &&
        squares[a].winner === squares[c].winner
      ) {
        return squares[a].winner;
      }
    }
    return squares.every(cell => cell.winner !== null) ? Winner.Draw : null;
  }

  render() {
    return (
      <div className={css({ textAlign: 'center' })}>
        <div className={css({ display: 'inline-block' })}>
          <LargeBoard
            available={this.state.available}
            boards={this.state.boards}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

interface LargeBoardProps {
  available: number[];
  boards: Board[];
  handleClick: (i: number, j: number) => void;
}

const boardStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(auto, max-content))',
};

const LargeBoard = (props: LargeBoardProps) => (
  <div
    className={css({
      backgroundColor: 'black',
      border: '1px solid black',
      gridGap: 1,
      ...boardStyle,
    })}
  >
    {props.boards.map((board: Board, i: number) => {
      const availableBoard = props.available.includes(i);
      return (
        <SmallBoard
          key={i}
          available={availableBoard}
          board={props.boards[i]}
          handleClick={j => {
            if (availableBoard) {
              props.handleClick(i, j);
            }
          }}
        />
      );
    })}
  </div>
);

interface SmallBoardProps {
  available: boolean;
  board: Board;
  handleClick: (i: number) => void;
}

const SmallBoard = (props: SmallBoardProps) => (
  <div
    className={css({
      backgroundColor: props.available ? 'green' : 'red',
      padding: 10,
      position: 'relative',
      ...boardStyle,
    })}
  >
    {props.board.winner !== null && (
      <div
        className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        })}
      >
        {getSymbol(props.board.winner)()}
      </div>
    )}
    {props.board.cells.map((cell: Cell, i: number) => (
      <Square key={i} cell={cell} onClick={() => props.handleClick(i)} />
    ))}
  </div>
);

interface SquareProps {
  cell: Cell;
  onClick: () => void;
}

const Square = (props: SquareProps) => (
  <button
    className={css({
      backgroundColor: 'white',
      border: '1px solid #999',
      height: 34,
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      width: 34,
    })}
    onClick={props.onClick}
  >
    {getSymbol(props.cell.winner)()}
  </button>
);

function getSymbol(player: Winner): () => JSX.Element {
  switch (player) {
    case Winner.Nought:
      return () => <Nought />;
    case Winner.Cross:
      return () => <Cross />;
    default:
      return () => <span />;
  }
}

const Nought = () => (
  <svg version="1.1" baseProfile="full" width="100%" height="100%">
    <circle
      cx="50%"
      cy="50%"
      r="30%"
      stroke="black"
      strokeWidth="10%"
      fill="transparent"
    />
  </svg>
);

const Cross = () => (
  <svg version="1.1" baseProfile="full" width="100%" height="100%">
    <line
      x1="20%"
      y1="20%"
      x2="80%"
      y2="80%"
      stroke="black"
      strokeWidth="10%"
    />
    <line
      x1="20%"
      y1="80%"
      x2="80%"
      y2="20%"
      stroke="black"
      strokeWidth="10%"
    />
  </svg>
);

export default Game;
