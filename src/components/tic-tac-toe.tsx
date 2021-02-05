import * as React from 'react';
import './ticTacToe.css';
import { css } from 'emotion';
import { Board } from './viktorBoard';

interface ToggleProps {
  onClick: () => void;
  isToggleOn: boolean;
}

interface RestartProps {
  onClick: () => void;
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

interface CookieEntry {
  winner: string;
  mode: string;
  number: number;
}

const stepHistoryTextElement = css({
  textDecoration: 'none',
  color: '#000',
  transition: 'font-size 0.3s ease, background-color 0.3s ease',
  display: 'block',
  width: 200,
  '&:hover': {
    fontSize: 16,
    background: '#f6f6f6',
  },
});

const stepHistoryElement = css({
  font: '200 14px/1.5 Helvetica, Verdana, sans-serif',
  borderBottom: '1px solid #ccc',
});

const Toggle = (props: ToggleProps) => {
  return (
    <button onClick={() => props.onClick()}>
      {props.isToggleOn ? 'Ascending' : 'Descending'}
    </button>
  );
};

const Restart = (props: RestartProps) => {
  return <button onClick={() => props.onClick()}>Restart</button>;
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

  handleWinnerCookies(currentState: GameState): void {
    console.log('New cookie entry has been called');
    // Building up the new entry
    const currentSquares =
      currentState.history[currentState.history.length - 1].squares;
    const winner = calculateWinner(currentSquares)
      ? currentSquares[calculateWinner(currentSquares)[0]] + ' won'
      : 'Draw';
    const newEntry = {
      winner,
      mode: this.props.againstComputer ? ' (against computer)' : ' (2 players)',
      number: 0,
    };

    const currentCookieString = getCookie('matchHistory');
    if (!currentCookieString) {
      document.cookie = `matchHistory=${JSON.stringify([newEntry])}`;
      return;
    }

    const currentCookie = JSON.parse(currentCookieString);
    console.log(`Current cookie: `);
    console.log(currentCookie);
    console.log('Adding new entry...');
    console.log(newEntry);
    const minimumEntry = Math.max(0, currentCookie.length - 9);
    const newCookie = currentCookie.slice(minimumEntry);
    newCookie.push(newEntry);
    // Update number for every cookie
    for (let i = 0; i < newCookie.length; i++) {
      newCookie[i].number = i;
    }
    console.log(`Writing out cookie...`);
    console.log(newCookie);
    document.cookie = `matchHistory=${JSON.stringify(newCookie)}`;
  }

  getStateAfterClick(i: number, currentState: GameState): GameState {
    const history = currentState.history.slice();
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = currentState.xIsNext ? 'X' : 'O';
    const newState: GameState = {
      history: history.concat([
        {
          lastMove: i,
          squares,
        },
      ]),
      isToggleOn: currentState.isToggleOn,
      stepNumber: history.length,
      xIsNext: !currentState.xIsNext,
    };
    return newState;
  }

  handleClick(i: number) {
    const newState = this.getStateAfterClick(i, this.state);
    // Wrong move or the game has already ended
    if (!newState) {
      return;
    }

    console.log('Entered interesting bit of handleClick');

    // If someone has won or the game has ended in draw update cookies
    if (
      calculateWinner(newState.history[newState.history.length - 1].squares) ||
      newState.stepNumber === 9
    ) {
      this.handleWinnerCookies(newState);
    }

    // If it's the computer's turn
    // "Click" the appropriate button
    if (
      this.props.againstComputer &&
      !newState.xIsNext &&
      !calculateWinner(newState.history[newState.history.length - 1].squares) &&
      newState.history.length !== 10
    ) {
      const newestState = this.getStateAfterClick(
        calculateNextMove(
          newState.history[newState.history.length - 1].squares,
          false,
        ).index,
        newState,
      );

      // If the computer has won (or draw) update cookies
      if (
        calculateWinner(
          newestState.history[newestState.history.length - 1].squares,
        ) ||
        newestState.stepNumber === 9
      ) {
        this.handleWinnerCookies(newestState);
      }
      this.setState(newestState);
    } else {
      this.setState(newState);
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

  restartGame() {
    window.location.replace('/indexViktor');
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
      return (
        <li className={stepHistoryElement} key={moveNum}>
          <a
            href="#"
            className={stepHistoryTextElement}
            onClick={() => this.jumpTo(moveNum)}
          >
            {desc}
          </a>
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

    // Creating history list
    const matchHistoryString = getCookie('matchHistory');
    console.log(`The cookies: ${document.cookie}`);
    console.log(`Got cookie: ${matchHistoryString}`);
    const matchHistory = matchHistoryString
      ? JSON.parse(matchHistoryString)
      : [];
    const matchHistoryElements = matchHistory.map((match: CookieEntry) => (
      <li key={match.number}>
        <p>{`${match.winner} ${match.mode}`}</p>
      </li>
    ));

    // Build up DOM
    return (
      <div
        className={css(`
        display: flex;
        flex-direction: row;`)}
      >
        <Board
          squares={current.squares}
          onClick={(i: number) => this.handleClick(i)}
          winnerSquares={!!winnerSquares ? winnerSquares : Array(9).fill(false)}
          size={{ row: 3, col: 3 }}
        />
        <div
          className={css({
            marginLeft: 40,
          })}
        >
          <div
            className={css({
              marginBottom: 15,
              fontSize: 20,
            })}
          >
            {status}
          </div>
          <ol
            className={css({
              listStyleType: 'none',
              margin: 0,
              padding: 0,
            })}
          >
            {moves}
          </ol>
          <Toggle
            isToggleOn={this.state.isToggleOn}
            onClick={() => this.toggleHandler()}
          />
          <Restart onClick={() => this.restartGame()} />
        </div>
        <div
          className={css({
            marginLeft: 40,
          })}
        >
          <div
            className={css({
              marginBottom: 15,
              fontSize: 20,
            })}
          >
            Previous Matches
          </div>
          <ol
            className={css({
              paddingLeft: 30,
            })}
          >
            {matchHistoryElements}
          </ol>
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

function notFalsy(value: any): boolean {
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

  if (squares.slice().filter(notFalsy).length === 9) {
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
    ? Math.min(...weights.slice().filter(notNull))
    : Math.max(...weights.slice().filter(notNull));
  const possibleMax = getAllIndexOF(weights, maxOrMin);
  const chosenOne = chooseRandom(possibleMax);
  return { maxOrMin, index: chosenOne };
}

// Returns the associated value with key 'name'
function getCookie(name: string): string {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }
}

// ========================================
module.exports = { Game, calculateNextMove };
