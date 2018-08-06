import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: boolean[][];
  boardContents: string[][];
}

const fillBoard: string[][] = [];
for (let i = 0; i < 12; i++) {
  const newRow = [];
  for (let j = 0; j < 12; j++) {
    newRow.push(Math.random() > 0.92 ? 'M' : null);
  }
  fillBoard.push(newRow);
}

for (let i = 1; i < 11; i++) {
  for (let j = 1; j < 11; j++) {
    if (fillBoard[i][j] === 'M') {
      continue;
    } else {
      const surroundingSquares = [
        fillBoard[i + 1][j - 1],
        fillBoard[i + 1][j],
        fillBoard[i + 1][j + 1],
        fillBoard[i][j + 1],
        fillBoard[i][j - 1],
        fillBoard[i - 1][j - 1],
        fillBoard[i - 1][j],
        fillBoard[i - 1][j + 1],
      ];

      const countSquares = surroundingSquares.filter(value => value === 'M');
      console.log(countSquares);
      const mineCount = countSquares.length;

      fillBoard[i][j] = mineCount.toString();

      // console.log(mineCount, 'in', i, j);

      // if (fillBoard[i + 1][j - 1] === 'M') {
      //   mineCount++;
      //   console.log('Ref', i, j);
      //   console.log(i + 1, j - 1);
      // }
      // if (fillBoard[i + 1][j] === 'M') {
      //   mineCount++;
      //   console.log('Ref', i, j);
      //   console.log(i + 1, j);
      // }

      // for (let k = -1; k < 2; k++) {
      //   for (let g = -1; g < 2; g++) {
      //     if (
      //       i + k > -1 &&
      //       i + k < 12 &&
      //       j + g > -1 &&
      //       j + g < 12 &&
      //       fillBoard[i + k][j + k] === 'M'
      //     ) {
      //       mineCount++;
      //       console.log('Ref', i, j);
      //       console.log(i + k, j + k);
      //       continue;
      //     } else {
      //       continue;
      //     }
      //   }
      // }
      //
      // if (mineCount) {
      //   fillBoard[i][j] = mineCount.toString();
      // }
    }
  }
}

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
    };
  }
  handleClick(i: number, j: number) {
    const newClickArray = this.state.clickedSquares;
    newClickArray[i][j] = true;
    this.setState({
      clickedSquares: newClickArray,
    });
  }
  render() {
    return (
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
    );
  }
}
