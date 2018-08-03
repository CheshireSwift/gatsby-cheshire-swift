import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

function Square(props: {
  value: string;
  onClick: () => void;
  isClicked: boolean;
}) {
  return (
    <button
      className={css(
        {
          backgroundColor: 'white',
          border: '1px solid #999',
          float: 'left',
          font: 'inherit',
          fontSize: 15,
          fontWeight: 'bold',
          height: 25,
          lineHeight: '34px',
          margin: 0,
          marginRight: -1,
          marginTop: -1,
          overflow: 'visible',
          padding: 0,
          textAlign: 'center',
          textTransform: 'none',
          width: 25,
        },
        { ':focus': { outline: 'none' } },
      )}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: string[][];
  onClick: (i: number, j: number) => void;
  clickArray: boolean[][];
  rowNumber: number;
  colNumber: number;
}
export default class Board extends React.Component<BoardProps, {}> {
    constructor(props: BoardProps) {
        super(props);
        this.squares = 
      }

renderSquare(i: number, j: number) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
        isClicked={this.props.clickArray[i][j]}
      />
    );
  }

render() {

    this.rowNumber = 50;
    this.colNumber = 50;

    return (
      <div>
        <div className="board-row">
          {this.squares.foreach =>}
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
