import * as React from 'react';
// import './index.css';

function Square(props: any) {
  return (
    <button className={props.isWinning} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: any[];
  onClick: any;
  winningArray: any;
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

interface GameProps {}

interface GameState {
  history: Array<{ squares: any[]; clickedSquare?: number[] }>;
  stepNumber: number;
  xIsNext: boolean;
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
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
          squares,
          clickedSquare: [Math.floor((i % 3) + 1), Math.floor(i / 3 + 1)],
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

    const moves = history.map((step: any, move: number) => {
      const clickedSquare = step.clickedSquare;
      const desc = move
        ? `Go to move #${move} (Col: ${clickedSquare[0]} Row:${
            clickedSquare[1]
          })`
        : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else if (current.squares.includes(null) === false) {
      status = 'Tie: No available moves remaining';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winningArray={createWinningArray(
              calculateWinner(history[this.state.stepNumber].squares),
            )}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <div className="moveList">
            <ol>{moves}</ol>
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

function calculateWinner(squares: any[]) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return null;
}

function createWinningArray(winningSquares: any[]) {
  const winningArray = [
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
  ];
  if (winningSquares) {
    for (let i = 0; i < 3; i++) {
      winningArray[parseInt(winningSquares[1][i], 10)] = 'winning square';
    }
  }
  return winningArray;
}

export default Game;
