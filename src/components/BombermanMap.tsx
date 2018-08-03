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
  margin: 0px;
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
  const src = {
    empty: '/assets/GrassTile.png',
    p1: '/assets/BomberMan1.png',
    bomb1: '/assets/bomb1.png',
    bomb2: '/assets/bomb2.png',
    bomb3: '/assets/bomb3.png',
    p2: '/assets/BomberMan2.png',
    fire: '/assets/fire.png',
    wall: '/assets/wall.png',
  };
  switch (props.content) {
    case 'empty':
      return <SquareTile className="square" src={src.empty} />;
    case 'p1':
      return <SquareTile className="square" src={src.p1} />;
    case 'p2':
      return <SquareTile className="square" src={src.p2} />;
    case 'bomb1':
      return <SquareTile className="square" src={src.bomb1} />;
    case 'bomb2':
      return <SquareTile className="square" src={src.bomb2} />;
    case 'bomb3':
      return <SquareTile className="square" src={src.bomb3} />;
    case 'fire':
      return <SquareTile className="square" src={src.fire} />;
    case 'wall':
      return <SquareTile className="square" src={src.wall} />;
  }
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
