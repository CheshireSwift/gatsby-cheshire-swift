import React = require('react');
import * as TBoard from './Board';
// import './tictactoe.css';
import styled from 'react-emotion';

const GameDiv = styled('div')`
  display: flex;
  flex-direction: row;
`;

const GameInfoDiv = styled('div')`
  margin-left: 20px;
`;

const Olstyle = styled('ol')`
  padding-left: 30px;
`;

interface GameState {
  xIsNext: boolean;
  stepNumber: number;
  history: GameHistory[];
  winners: boolean[];
  reversedHistory: boolean;
}

interface GameHistory {
  squares: string[];
  lastStepx: number;
  lastStepy: number;
}

export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          lastStepx: -1,
          lastStepy: -1,
          squares: Array(9).fill(null),
        },
      ],
      reversedHistory: false,
      stepNumber: 0,
      winners: new Array(9).fill(false),
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history: GameHistory[] = this.state.history.slice(
      0,
      this.state.stepNumber + 1,
    );
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          lastStepx: (i % 3) + 1,
          lastStepy: Math.floor(i / 3) + 1,
          squares,
        },
      ]),
      reversedHistory: this.state.reversedHistory,
      stepNumber: history.length,
      winners: new Array(9).fill(false),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  reverse(reverseState: boolean) {
    this.setState({
      reversedHistory: !reverseState,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step: GameHistory, move: number) => {
      const desc = move
        ? `Go to move #${move} at (${step.lastStepx},${step.lastStepy})`
        : `Go to game start`;
      if (this.state.stepNumber === move) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              <b>{desc}</b>
            </button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
      winner[1].forEach((winnerBlock: number) => {
        this.state.winners[winnerBlock] = true;
      });
    } else {
      if (this.state.stepNumber === 9) {
        status = 'Draw!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    if (this.state.reversedHistory) {
      moves = moves.reverse();
    }
    return (
      <GameDiv className="game">
        <div className="gameboard">
          <TBoard.Board
            winners={this.state.winners}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <GameInfoDiv className="game-info">
          <div>{status}</div>
          <Olstyle>{moves}</Olstyle>
          <button
            onClick={() => {
              this.reverse(this.state.reversedHistory);
            }}
          >
            Reverse display
          </button>
        </GameInfoDiv>
      </GameDiv>
    );
  }
}

// ========================================

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
  let i: number;
  const returnvalue: any[] = [];
  for (i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      returnvalue.push(squares[a]);
      returnvalue.push(lines[i]);
      return returnvalue;
    }
  }
  return null;
}
