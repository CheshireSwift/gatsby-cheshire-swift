import * as React from 'react';
import * as _ from 'lodash';

interface SquareProps {
  winValue: boolean;
  onClick: any;
  value: number;
}

function Square(props: SquareProps): any {
  return (
    <button
      className={'square ' + (props.winValue ? 'winning' : '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: string[];
  onClick: any;
  winStatus: Array<number | string>;
}

export default class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winValue={
          this.props.winStatus ? this.props.winStatus.includes(i) : false
        }
      />
    );
  }

  renderRow(i: number) {
    return (
      <div className="board-row">
        {_.range(i * 3, (i + 1) * 3).map((num: number) =>
          this.renderSquare(num),
        )}
      </div>
    );
  }

  render() {
    return <div>{_.range(3).map((num: number) => this.renderRow(num))}</div>;
  }
}
