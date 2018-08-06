import React = require('react');
import styled from 'react-emotion';
import { arch } from 'os';

interface BombermanBoardState {
  width: number;
  higth: number;
  contents: string[];
}

interface SquareProp {
  content: string;
}

const RowDiv = styled('div')`
  margin: -2px;
`;

const BoardDiv = styled('div')`
  margin: 50px;
  position: left;
`;

const SquareTile = styled('img')`
  height: 30px;
  width: 30px;
  margin-right: -1px;
  margin: -1px;
  padding: 0px;
  border: 0px;
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
    p1b1: '/assets/BomberMan1Bomb1.png',
    p1b2: '/assets/BomberMan1Bomb2.png',
    p1b3: '/assets/BomberMan1Bomb3.png',
    p2b1: '/assets/BomberMan2Bomb1.png',
    p2b2: '/assets/BomberMan2Bomb2.png',
    p2b3: '/assets/BomberMan2Bomb3.png',
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
    case 'p1bomb1':
      return <SquareTile className="square" src={src.p1b1} />;
    case 'p1bomb2':
      return <SquareTile className="square" src={src.p1b2} />;
    case 'p1bomb3':
      return <SquareTile className="square" src={src.p1b3} />;
    case 'p2bomb1':
      return <SquareTile className="square" src={src.p2b1} />;
    case 'p2bomb2':
      return <SquareTile className="square" src={src.p2b2} />;
    case 'p2bomb3':
      return <SquareTile className="square" src={src.p2b3} />;
    case 'wall':
      return <SquareTile className="square" src={src.wall} />;
  }
  console.log(`this should never be displayed ${props.content}`);
}

export class BombermanBoard extends React.Component<BombermanBoardState> {
  renderSquare(i: number) {
    return <Square content={this.props.contents[i]} />;
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
