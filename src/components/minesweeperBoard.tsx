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

// interface BoardProps {
//   squares: string[];
//   onClick: (i: number) => void;
//   clickArray: boolean[];
// }

export default function Board(props: {
  squares: string[];
  onClick: (i: number) => void;
  clickArray: boolean[];
}) {
  function renderSquare(i: number) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isClicked={props.clickArray[i]}
      />
    );
  }
  const displaySquares: any[] = [];
  props.squares.forEach((square, index) => {
    displaySquares.push(renderSquare(index));
  });
  return <div>{displaySquares}</div>;
}
