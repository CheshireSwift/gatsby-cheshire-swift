import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import Board from './minesweeperBoard';

interface GameState {
  clickedSquares: boolean[];
  boardContents: string[];
}
export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    const fillBoard = Array(144).fill(null);
    fillBoard.forEach(square => {
      square = Math.random() > 0.95 ? 'B' : null;
    });
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
