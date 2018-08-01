import React = require('react');
import styled from 'react-emotion';

interface BombermanBoardState {
  width: number;
  higth: number;
  contents: string[];
}

interface SquareProp {
  id: number;
  content: string;
}

const RowDiv = styled('div')`
  margin-right: 0px;
`;

const BoardDiv = styled('div')`
  margin-right: 0px;
`;

const SquareTile = styled('img')`
  height: 30px;
  width: 30px;
  padding: 0;
  margin-right: 0px;
`;

function Square(props: SquareProp) {
  return <SquareTile className="square" src="/assets/GrassTile.png" />;
}

export class BombermanBoard extends React.Component<BombermanBoardState> {
  renderSquare(i: number) {
    return <Square id={i} content={this.props.contents[i]} />;
  }
  renderRow(i: number) {
    const row = [];
    for (let j = 0; j < this.props.width; j++) {
      row.push(this.renderSquare(i * this.props.width + j));
    }
    return <RowDiv>{row}</RowDiv>;
  }

  render() {
    const board = [];
    for (let i = 0; i < this.props.higth; i++) {
      board.push(this.renderRow(i));
    }
    return <BoardDiv>{board}</BoardDiv>;
  }
}
