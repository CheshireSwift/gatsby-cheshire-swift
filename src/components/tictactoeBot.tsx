function randomValidMove(current: string[]): number {
  let returnValue: number = Math.floor(Math.random() * 9);
  while (current[returnValue] !== null) {
    returnValue = Math.floor(Math.random() * 9);
  }
  return returnValue;
}

function counterDangerousLine(player: string, current: string[]): number {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const opponnent = player === 'X' ? 'O' : 'X';
  const lineValues: string[] = [];
  let resultBLock: number = -1;
  lines.forEach((line: number[]) => {
    for (let i: number = 0; i < 3; i++) {
      lineValues[i] = current[line[i]];
    }
    if (lineValues.indexOf(player) === -1) {
      if (
        (lineValues[0] === opponnent && lineValues[1] === opponnent) ||
        (lineValues[0] === opponnent && lineValues[2] === opponnent) ||
        (lineValues[1] === opponnent && lineValues[2] === opponnent)
      ) {
        resultBLock = line[lineValues.indexOf(null)];
      }
    }
  });
  return resultBLock;
}

export function AImove(squares: string[]): number {
  let Xcount: number = 0;
  let Ocount: number = 0;
  squares.forEach((square: string) => {
    if (square === 'X') {
      Xcount++;
    }
    if (square === 'O') {
      Ocount++;
    }
  });
  const player = Ocount === Xcount ? 'X' : 'O';
  if (counterDangerousLine(player, squares) !== -1) {
    return counterDangerousLine(player, squares);
  } else {
    return randomValidMove(squares);
  }
}
