import React = require('react');
import styled from 'react-emotion';
// background: ${props => (props.isWinner ? '#ffa500' : '#fff')};
const SquareButton = styled('button')`
  background: ${(props: SquareProp) =>
    props.winner ? 'hotpink' : 'turquoise'};
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`;

interface SquareProp {
  value: string;
  winner: boolean;
  onClick(): void;
}

interface BoardState {
  winners: boolean[];
  squares: string[];
  onClick(i: number): void;
}

function Square(props: SquareProp) {
  return (
    <SquareButton
      className="square"
      onClick={() => props.onClick()}
      winner={props.winner}
    >
      {props.value}
    </SquareButton>
  );
}

export class Board extends React.Component<BoardState> {
  renderSquare(i: number) {
    return (
      <Square
        winner={this.props.winners[i]}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(i: number) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(this.renderSquare(j * 3 + i));
    }
    return <div className="board-row">{row}</div>;
  }
  render() {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(this.renderRow(i));
    }
    return <div>{rows}</div>;
  }
}

module.exports = { Board };
