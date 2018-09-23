import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

interface SquareProps {
  winValue: boolean;
  onClick: any;
  value: number;
}

function Square(props: SquareProps): any {
  return (
    <button
      className={css({
        ':focus': {
          outline: 'none',
        },
        background: props.winValue ? 'rgb(0, 255, 0)' : 'white',
        border: '1px solid #999',
        float: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        height: 34,
        lineHeight: '34px',
        marginRight: -1,
        marginTop: -1,
        padding: 0,
        textAlign: 'center',
        width: 34,
      })}
      key={props.value}
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
        key={i}
      />
    );
  }

  renderRow(i: number) {
    return (
      <div
        className={css({
          ':after': {
            clear: 'both',
            display: 'table',
          },
        })}
        key={i}
      >
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
