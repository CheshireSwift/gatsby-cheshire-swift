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
    console.log(i, j);
    newRow.push(Math.random() > 0.92 ? 'B' : null);
  }
  fillBoard.push(newRow);
}
console.log(fillBoard);

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      boardContents: fillBoard,
      clickedSquares: Array(12).fill(Array(12).fill(null)),
    };
  }
  handleClick() {
    console.log('Click');
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
