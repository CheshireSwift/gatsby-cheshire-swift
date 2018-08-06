import * as Constants from './game-constants';

export function getCoefficients(position: Constants.Vector, angle: number) {
  // The 4 lines forming the boundary of a player square
  //   (at `position` and orientation `angle`)
  // are represented in "implicit form" A*x + B*y + C <= 0
  // If the line's expression evaluates to true, it implies
  // point (x,y) lies to the left, or on, the line.
  const angularOffset =
    (Math.atan(Constants.playerHeight / Constants.playerWidth) * 180) / Math.PI;
  const [topLeft, bottomRight] = getPoints(position, angle, [
    180 + angularOffset,
    angularOffset,
  ]);
  const coefficients: Constants.Line[] = [];
  if (angle === 0) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: topLeft.x },
        { A: 1, B: 0, C: -bottomRight.x },
        { A: 0, B: 1, C: -bottomRight.y },
        { A: 0, B: -1, C: topLeft.y }, // done
      ]
    );
  } else if (angle === 90) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: bottomRight.x },
        { A: 1, B: 0, C: -topLeft.x },
        { A: 0, B: 1, C: -bottomRight.y },
        { A: 0, B: -1, C: topLeft.y }, // done
      ]
    );
  } else if (angle === 180) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: bottomRight.x },
        { A: 1, B: 0, C: -topLeft.x },
        { A: 0, B: 1, C: -topLeft.y },
        { A: 0, B: -1, C: bottomRight.y }, // done
      ]
    );
  } else if (angle === 270) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: topLeft.x },
        { A: 1, B: 0, C: -bottomRight.x },
        { A: 0, B: 1, C: -topLeft.y },
        { A: 0, B: -1, C: bottomRight.y }, // done
      ]
    );
  } else {
    const m1 = Math.tan(angle * (Math.PI / 180));
    const m2 = -1 / m1;
    [topLeft, bottomRight].forEach(p => {
      const { x, y } = p;
      [m1, m2].forEach(m => {
        const line = {
          A: -m,
          B: 1,
          C: m * x - y,
        };
        if (!onLeftOf(position, line)) {
          // The implicit form of the line MUST include the square's center
          line.A = -line.A;
          line.B = -line.B;
          line.C = -line.C;
        }
        coefficients.push(line);
      });
    });
  }
  return coefficients;
}

export function getPoints(
  playerPosition: Constants.Vector,
  playerAngle: number,
  angles: number[]
) {
  const { x, y } = playerPosition; // center
  const [w, h] = [Constants.playerWidth, Constants.playerHeight];
  const radius = 0.5 * Math.sqrt(w * w + h * h);
  return angles.map(t => {
    const inRadians = (t + playerAngle) * (Math.PI / 180);
    return {
      x: x + radius * Math.cos(inRadians),
      y: y + radius * Math.sin(inRadians),
    };
  });
}

export function isInside(
  point: Constants.Vector,
  boundaryCoefficients: Constants.Line[]
) {
  return boundaryCoefficients.every((coefficients: Constants.Line) =>
    onLeftOf(point, coefficients)
  );
}

export function onLeftOf(p: Constants.Vector, coefficients: Constants.Line) {
  const { x, y } = p;
  const { A, B, C } = coefficients;
  return A * x + B * y + C <= 0;
}

export function getPairs(n: number) {
  const indices = [...Array(n).keys()];
  const playerCombinations: number[][] = [];
  indices.forEach((i: number) => {
    indices.slice(i).forEach(j => {
      if (i !== j) {
        playerCombinations.push([i, j]);
      }
    });
  });
  return playerCombinations;
}
