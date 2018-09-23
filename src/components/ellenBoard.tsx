import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

function Square(props: {
  value: string;
  onClick: () => void;
  isWinning: string;
}) {
  return (
    <button
      className={css(
        {
          backgroundColor:
            props.isWinning === 'winning square' ? 'lightgreen' : 'white',
          border: '1px solid #999',
          float: 'left',
          font: 'inherit',
          fontSize: 30,
          fontWeight: 'bold',
          height: 50,
          lineHeight: '34px',
          margin: 0,
          marginRight: -1,
          marginTop: -1,
          overflow: 'visible',
          padding: 0,
          textAlign: 'center',
          textTransform: 'none',
          width: 50,
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
  squares: string[];
  onClick: (i: number) => void;
  winningArray: string[];
}
export default class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinning={this.props.winningArray[i]}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
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
