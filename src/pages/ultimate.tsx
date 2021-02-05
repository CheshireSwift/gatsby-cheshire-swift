import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

import { Nought, Cross } from '../components/shapes';

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
  const winningLine = lines.find(
    ([a, b, c]) =>
      squares[a].player !== null &&
      squares[a].player !== Winner.Draw &&
      squares[a].player === squares[b].player &&
      squares[a].player === squares[c].player,
  );
  if (winningLine) {
    return squares[winningLine[0]].player;
  } else if (squares.every(child => child.player !== null)) {
    return Winner.Draw;
  } else {
    return null;
  }
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
    const boards = [...this.state.boards];
    boards[i] = {
      cells: [...boards[i].cells],
    };
    const smallBoardWinner = calculateWinner(boards[i].cells);
    if (smallBoardWinner || boards[i].cells[j].player !== null) {
      return;
    }
    boards[i].cells[j].player = this.state.xIsNext
      ? Winner.Cross
      : Winner.Nought;
    let available: number[];
    const overallWinner = calculateWinner(
      boards.map(board => ({ player: calculateWinner(board.cells) })),
    );
    if (overallWinner) {
      available = [];
    } else {
      const boardWinner = (board: Board) => calculateWinner(board.cells);
      available = boardWinner(boards[j])
        ? _.range(9).filter(board => !boardWinner(boards[board]))
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

export const SmallBoard = (props: SmallBoardProps) => {
  const winner = calculateWinner(props.board.cells);
  return (
    <div
      className={css({
        backgroundColor: props.available ? 'green' : 'red',
        padding: 10,
        position: 'relative',
        ...boardStyle,
      })}
    >
      {winner && (
        <div
          className={css({
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          })}
        >
          {getSymbol(winner)()}
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
};

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

export default Game;
