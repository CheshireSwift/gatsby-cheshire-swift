import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

export enum Winner {
  Nought,
  Cross,
  Draw,
}

export interface Cell {
  player: Nullable<Winner>;
}

export interface Board {
  cells: Cell[];
}

function calculateWinner(squares: Cell[]): Nullable<Winner> {
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
      squares[a].player !== null &&
      squares[a].player !== Winner.Draw &&
      squares[a].player === squares[b].player &&
      squares[a].player === squares[c].player
    ) {
      return squares[a].player;
    }
  }
  return squares.every(cell => cell.player !== null) ? Winner.Draw : null;
}

export interface GameState {
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
        cells: _.times(9, j => ({ player: null })),
      })),
      xIsNext: true,
    };
  }

  handleClick(i: number, j: number) {
    const boards = this.state.boards.slice();
    boards[i] = {
      cells: boards[i].cells.slice(),
    };
    if (
      calculateWinner(boards[i].cells) !== null ||
      boards[i].cells[j].player !== null
    ) {
      return;
    }
    boards[i].cells[j].player = this.state.xIsNext
      ? Winner.Cross
      : Winner.Nought;
    let available: number[];
    if (
      calculateWinner(
        boards.map(board => ({ player: calculateWinner(board.cells) })),
      ) !== null
    ) {
      available = [];
    } else {
      available =
        calculateWinner(boards[j].cells) !== null
          ? _.range(9).filter(
              board => calculateWinner(boards[board].cells) === null,
            )
          : [j];
    }
    this.setState(prevState => ({
      available,
      boards,
      xIsNext: !prevState.xIsNext,
    }));
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

export interface LargeBoardProps {
  available: number[];
  boards: Board[];
  handleClick: (i: number, j: number) => void;
}

const boardStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(auto, max-content))',
};

export const LargeBoard = (props: LargeBoardProps) => (
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
          board={board}
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

export interface SmallBoardProps {
  available: boolean;
  board: Board;
  handleClick: (i: number) => void;
}

export const SmallBoard = (props: SmallBoardProps) => (
  <div
    className={css({
      backgroundColor: props.available ? 'green' : 'red',
      padding: 10,
      position: 'relative',
      ...boardStyle,
    })}
  >
    {calculateWinner(props.board.cells) !== null && (
      <div
        className={css({
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        })}
      >
        {getSymbol(calculateWinner(props.board.cells))()}
      </div>
    )}
    {props.board.cells.map((cell: Cell, i: number) => (
      <Square
        key={i}
        cell={cell}
        onClick={props.available ? () => props.handleClick(i) : null}
      />
    ))}
  </div>
);

export interface SquareProps {
  cell: Cell;
  onClick: () => void;
}

export const Square = (props: SquareProps) => (
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
    {getSymbol(props.cell.player)()}
  </button>
);

function getSymbol(player: Winner): () => JSX.Element {
  switch (player) {
    case Winner.Nought:
      return () => <Nought />;
    case Winner.Cross:
      return () => <Cross />;
    default:
      return () => null;
  }
}

export const Nought = () => (
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

export const Cross = () => (
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
