import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: boolean[];
  boardContents: string[];
}

const fillBoard: string[] = [];
for (let i = 0; i < 144; i++) {
  fillBoard[i] = Math.random() > 0.92 ? 'B' : null;
}

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    console.log(fillBoard);
    this.state = {
      boardContents: fillBoard,
      clickedSquares: Array(144).fill(null),
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
