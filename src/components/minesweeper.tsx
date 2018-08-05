import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: Array<boolean>;
  boardContents: Array<string>;
}
export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    let fillBoard = Array(144).fill(null);
    fillBoard.forEach(square => {
      square = Math.random() > 0.95 ? 'B' : null;
    });
    this.state = {
      boardContents: fillBoard,
      clickedSquares: Array(144).fill(null)
    };
  }
  handleClick() {

  }
  render() {
    return (
      <div>
        <Board
          squares={this.state.boardContents}
          onClick={this.handleClick}
          clickArray={this.state.clickedSquares}
        />
      </div>
    );
  }
}
