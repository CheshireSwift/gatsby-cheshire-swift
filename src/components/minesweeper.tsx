import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: boolean[][];
  boardContents: string[][];
  winningStatus: string;
}

// Generates mines randomly
const fillBoard: string[][] = [];
for (let i = 0; i < 12; i++) {
  const newRow = [];
  for (let j = 0; j < 12; j++) {
    newRow.push(Math.random() > 0.8 ? 'M' : null);
  }
  fillBoard.push(newRow);
}

// Counts adjacent mines
for (let i = 0; i < 12; i++) {
  for (let j = 0; j < 12; j++) {
    if (fillBoard[i][j] === 'M') {
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
              surroundingSquares.push(fillBoard[i + k][j + l]);
            }
          }
        }
      }
      const countSquares = surroundingSquares.filter(value => value === 'M');
      const mineCount = countSquares.length;

      fillBoard[i][j] = mineCount.toString();
    }
  }
}
// Creates array to track which squares have been clicked
const setClickedSquares: boolean[][] = [];
for (let i = 0; i < 12; i++) {
  const newRow = [];
  for (let j = 0; j < 12; j++) {
    newRow.push(false);
  }
  setClickedSquares.push(newRow);
}

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      boardContents: fillBoard,
      clickedSquares: setClickedSquares,
      winningStatus: 'playing',
    };
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
            clickArray={this.state.clickedSquares}
          />
        </div>
        <p>{displayStatus}</p>
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
