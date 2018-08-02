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
  margin: 0px;
`;

const BoardDiv = styled('div')`
  margint: 0px;
`;

const SquareTile = styled('img')`
  height: 30px;
  width: 30px;
  margin-right: -1px;
  margin: -1px;
  padding: 0;
  border: 2px;
`;

function Square(props: SquareProp) {
  let src = '';
  switch (props.content) {
    case 'empty':
      src = '/assets/GrassTile.png';
      break;
    case 'p1':
      src = '/assets/BomberMan1.png';
      break;
  }
  return <SquareTile className="square" src={src} />;
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
