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
  squares: string[];
  onClick: (i: number) => void;
  clickArray: boolean[];
}
export default class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isClicked={this.props.clickArray[i]}
      />
    );
  }

  makeBoard() {
    this.props.squares.forEach((square, index) => {
      this.renderSquare(index);
    })
  }

  render() {
    return (
      <div>
        {this.renderSquare(1)}
      </div>
    )
  }

}

