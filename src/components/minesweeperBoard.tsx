import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

function Square(props: {
  value: string;
  onClick: () => void;
  onContextMenu: () => void;
  isClicked: boolean;
  isFlagged: boolean;
}) {
  return (
    <button
      className={css(
        {
          backgroundColor: props.isFlagged === true ? 'red' : 'white',
          color: 'black',
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
      onContextMenu={props.onContextMenu}
    >
      <p
        className={css({
          visibility: props.isClicked === true ? 'visible' : 'hidden',
        })}
      >
        {props.value}
      </p>
    </button>
  );
}

export default function Board(props: {
  squares: string[][];
  onClick: (i: number, j: number) => void;
  onContextMenu: (i: number, j: number) => void;
  clickArray: boolean[][];
  flaggedSquares: boolean[][];
}) {
  function renderSquare(i: number, j: number) {
    return (
      <Square
        value={props.squares[i][j]}
        onClick={() => props.onClick(i, j)}
        onContextMenu={() => props.onContextMenu(i, j)}
        isClicked={props.clickArray[i][j]}
        isFlagged={props.flaggedSquares[i][j]}
      />
    );
  }

  const displaySquares = Array(12).fill(Array(12).fill(null));
  for (let i = 0; i < 12; i++) {
    const newRow = [];
    for (let j = 0; j < 12; j++) {
      newRow.push(renderSquare(i, j));
    }
    displaySquares.push(newRow);
  }
  return <div>{displaySquares}</div>;
}
