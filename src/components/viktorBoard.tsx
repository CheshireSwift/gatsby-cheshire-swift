import * as React from 'react';
import { css } from '../../node_modules/emotion';

interface SquareProps {
  buttonClass: string;
  isWinner: boolean;
  onClick: () => void;
}

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
  size: { row: number; col: number };
  winnerSquares: number[];
}

interface RowProps {
  rowNum: number;
  onClick: (i: number) => void;
  size: number;
  squares: string[];
  winnerSquares: number[];
}

const Square = (props: SquareProps) => {
  // Use background color for Connect 4
  let backGroundColor = '#fff';
  switch (props.buttonClass) {
    case Player.YELLOW:
      backGroundColor = '#ffff00';
      break;
    case Player.RED:
      backGroundColor = '#ff0000';
      break;
  }

  // Use images for Tic-Tac-Toe
  let image = '';
  switch (props.buttonClass) {
    case 'X':
      image = props.isWinner
        ? '/assets/redcross-resized-winner.png'
        : '/assets/redcross-resized.png';
      break;
    case 'O':
      image = props.isWinner
        ? '/assets/bluecircle-resized-winner.png'
        : '/assets/bluecircle-resized.png';
      break;
  }

  // Also, different square size for tic-tac-toe
  let squareSize = 34;
  if (
    props.buttonClass === 'X' ||
    props.buttonClass === null ||
    props.buttonClass === 'O'
  ) {
    squareSize = 60;
  }

  const background =
    image === '' ? backGroundColor : `transparent url('${image}') no-repeat`;

  console.log(
    `Rendering square with background=${background}, color=${backGroundColor}, image=${image}, class=${
      props.buttonClass
    }`,
  );

  return (
    <button
      className={css({
        background,
        backgroundPosition: '3px center',
        border: '1px solid #999',
        float: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 34,
        height: squareSize,
        marginRight: -1,
        marginTop: -1,
        padding: 0,
        textAlign: 'center',
        width: squareSize,
        '&:focus': {
          outline: 'none',
        },
      })}
      onClick={props.onClick}
    />
  );
};

const Player = Object.freeze({
  YELLOW: 'yellow-square',
  RED: 'red-square',
  EMPTY: 'empty-square',
});

function renderSquare(props: SquareProps): JSX.Element {
  return (
    <Square
      buttonClass={props.buttonClass}
      onClick={() => props.onClick()}
      isWinner={props.isWinner}
    />
  );
}

const Row = (props: RowProps) => {
  const cells = [];
  for (let i = 0; i < props.size; i++) {
    cells.push(
      renderSquare({
        buttonClass: props.squares[props.size * props.rowNum + i],
        onClick: () => props.onClick(props.size * props.rowNum + i),
        isWinner: props.winnerSquares.includes(props.size * props.rowNum + i),
      }),
    );
  }
  return <div className="board-row">{cells}</div>;
};

const Board = (props: BoardProps) => {
  console.log(`Rendering squares:`);
  console.log(props.squares);
  console.log(`Winner squares:`);
  console.log(props.winnerSquares);
  const rows = [];
  for (let i = 0; i < props.size.row; i++) {
    rows.push(
      <Row
        rowNum={i}
        onClick={props.onClick}
        squares={props.squares}
        size={props.size.col}
        winnerSquares={props.winnerSquares}
      />,
    );
  }

  return <div>{rows}</div>;
};

module.exports = { Board };
