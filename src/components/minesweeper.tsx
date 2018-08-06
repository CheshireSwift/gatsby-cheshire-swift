import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: boolean[][];
  boardContents: string[][];
  flaggedSquares: boolean[][];
  winningStatus: string;
}

// Generates mines randomly

function layMines() {
  const fillBoard: string[][] = [];
  for (let i = 0; i < 12; i++) {
    const newRow = [];
    for (let j = 0; j < 12; j++) {
      newRow.push(Math.random() > 0.8 ? 'M' : null);
    }
    fillBoard.push(newRow);
  }
  return fillBoard;
}

const mineBoard = layMines();

function countAdjacentMines(board: string[][]) {
  // Counts adjacent mines
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      if (board[i][j] === 'M') {
        continue;
      } else {
        const surroundingSquares = [];
        for (let k = -1; k <= 1; k++) {
          if (i + k < 0 || i + k > 11) {
            continue;
          } else {
            for (let l = -1; l <= 1; l++) {
              if (j + l < 0 || j + l > 11) {
                continue;
              } else {
                surroundingSquares.push(board[i + k][j + l]);
              }
            }
          }
        }
        const countSquares = surroundingSquares.filter(value => value === 'M');
        const mineCount = countSquares.length;

        board[i][j] = mineCount.toString();
      }
    }
  }
}
// Creates array to track which squares have been clicked
function resetClickedSquares() {
  const falseSquares = [];
  for (let i = 0; i < 12; i++) {
    const newRow = [];
    for (let j = 0; j < 12; j++) {
      newRow.push(false);
    }
    falseSquares.push(newRow);
  }
  return falseSquares;
}

const setClickedSquares = resetClickedSquares();
const setFlaggedSquares = resetClickedSquares();

countAdjacentMines(mineBoard);

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.state = {
      boardContents: mineBoard,
      clickedSquares: setClickedSquares,
      flaggedSquares: setFlaggedSquares,
      winningStatus: 'playing',
    };
  }

  newGame() {
    const newMines = layMines();
    countAdjacentMines(newMines);
    console.log(setClickedSquares);
    const newClick = resetClickedSquares();
    const newFlag = resetClickedSquares();
    this.setState({
      boardContents: newMines,
      clickedSquares: newClick,
      winningStatus: 'playing',
      flaggedSquares: newFlag,
    });
  }

  handleClick(i: number, j: number) {
    if (this.state.winningStatus === 'lost') {
      return;
    }
    // Reveals this square
    const newClickArray = this.state.clickedSquares;
    newClickArray[i][j] = true;
    this.setState({
      clickedSquares: newClickArray,
    });
    // Reveals all adjacent squares for 0 mine squares (recursively)
    if (this.state.boardContents[i][j] === '0') {
      for (let k = -1; k <= 1; k++) {
        if (i + k < 0 || i + k > 11) {
          continue;
        } else {
          for (let l = -1; l <= 1; l++) {
            if (j + l < 0 || j + l > 11) {
              continue;
            } else if (!this.state.clickedSquares[i + k][j + l]) {
              this.handleClick(i + k, j + l);
            }
          }
        }
      }
    }
    if (
      calculateStatus(this.state.boardContents, this.state.clickedSquares) ===
      'lost'
    ) {
      this.setState({
        winningStatus: 'lost',
      });
    }
  }

  handleRightClick(i: number, j: number) {
    if (!this.state.clickedSquares[i][j]) {
      const newFlagArray = this.state.flaggedSquares;
      newFlagArray[i][j] = true;
      this.setState({
        flaggedSquares: newFlagArray,
      });
    }
  }

  render() {
    const computeStatus = () => {
      if (this.state.winningStatus === 'lost') {
        return 'You exploded! Better luck next time.';
      } else {
        return 'Tread carefully...';
      }
    };

    const displayStatus = computeStatus();

    return (
      <div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            width: 300,
          })}
        >
          <Board
            squares={this.state.boardContents}
            onClick={this.handleClick}
            onContextMenu={this.handleRightClick}
            clickArray={this.state.clickedSquares}
            flaggedSquares={this.state.flaggedSquares}
          />
        </div>
        <p>{displayStatus}</p>
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
          onClick={() => this.newGame()}
        >
          New game
        </button>
      </div>
    );
  }
}

function calculateStatus(
  boardContents: string[][],
  clickedSquares: boolean[][],
) {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      if (boardContents[i][j] === 'M' && clickedSquares[i][j]) {
        return 'lost';
      }
    }
  }
}
