import * as React from 'react';
import * as Constants from './game-constants';
import { Bullet } from './bullet';
import { Player } from './player';

function getCoefficients(position: Constants.Vector, angle: number) {
  // The 4 lines forming the boundary of a player square
  //   (at `position` and orientation `angle`)
  // are represented in "implicit form" A*x + B*y + C <= 0
  // If the line's expression evaluates to true, it implies
  // point (x,y) lies to the left, or on, the line.
  const [topLeft, bottomRight] = getPoints(position, angle, [180 + 45, 45]);
  const coefficients: Constants.Line[] = [];
  if (angle === 0) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: topLeft.x },
        { A: 1, B: 0, C: -bottomRight.x },
        { A: 0, B: 1, C: -bottomRight.y },
        { A: 0, B: -1, C: topLeft.y }, // done
      ],
    );
  } else if (angle === 90) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: bottomRight.x },
        { A: 1, B: 0, C: -topLeft.x },
        { A: 0, B: 1, C: -bottomRight.y },
        { A: 0, B: -1, C: topLeft.y }, // done
      ],
    );
  } else if (angle === 180) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: bottomRight.x },
        { A: 1, B: 0, C: -topLeft.x },
        { A: 0, B: 1, C: -topLeft.y },
        { A: 0, B: -1, C: bottomRight.y }, // done
      ],
    );
  } else if (angle === 270) {
    coefficients.push(
      ...[
        { A: -1, B: 0, C: topLeft.x },
        { A: 1, B: 0, C: -bottomRight.x },
        { A: 0, B: 1, C: -topLeft.y },
        { A: 0, B: -1, C: bottomRight.y }, // done
      ],
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

function getPoints(
  playerPosition: Constants.Vector,
  playerAngle: number,
  angles: number[],
) {
  const { x, y } = playerPosition; // center
  const radius = Constants.sideLength / 1.414; // root(2) approx
  return angles.map(t => {
    const inRadians = (t + playerAngle) * (Math.PI / 180);
    return {
      x: x + radius * Math.cos(inRadians),
      y: y + radius * Math.sin(inRadians),
    };
  });
}

function isInside(
  point: Constants.Vector,
  boundaryCoefficients: Constants.Line[],
) {
  return boundaryCoefficients.every((coefficients: Constants.Line) =>
    onLeftOf(point, coefficients),
  );
}

function onLeftOf(p: Constants.Vector, coefficients: Constants.Line) {
  const { x, y } = p;
  const { A, B, C } = coefficients;
  return A * x + B * y + C <= 0;
}

function getPairs(n: number) {
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

interface BulletState {
  position: Constants.Vector;
  angle: number;
  age: number;
}

interface SkyState {
  isPaused: boolean;
  player: Constants.PlayerState[];
  bullet: BulletState[];
}

export class Sky extends React.Component<{}, SkyState> {
  CCWdown = this.genericKeypress('turningCCW', true);
  CCWup = this.genericKeypress('turningCCW', false);
  CWdown = this.genericKeypress('turningCW', true);
  CWup = this.genericKeypress('turningCW', false);

  keyHandlers = [
    this.CWdown,
    this.CWup,
    this.CCWdown,
    this.CCWup,
    this.fireBullet,
  ];
  constructor(props: {}) {
    super(props);
    this.state = {
      isPaused: true,
      player: [
        {
          position: {
            x: 70,
            y: 70,
          },
          angle: 0,
          turningCW: false,
          turningCCW: false,
          keyCodes: ['KeyA', 'KeyD', 'KeyF'],
          colour: '#ff0',
          health: 100,
        },

        {
          position: {
            x: 70,
            y: 150,
          },
          angle: 0,
          turningCW: false,
          turningCCW: false,
          keyCodes: ['ArrowLeft', 'ArrowRight', 'KeyM'],
          colour: '#0ff',
          health: 100,
        },

        {
          position: {
            x: 70,
            y: 230,
          },
          angle: 0,
          turningCW: false,
          turningCCW: false,
          keyCodes: ['KeyH', 'KeyK', 'KeyL'],
          colour: '#f0f',
          health: 100,
        },
      ],
      bullet: [],
    };
    this.CWdown = this.CWdown.bind(this);
    this.CCWdown = this.CCWdown.bind(this);
    this.CWup = this.CWup.bind(this);
    this.CCWup = this.CCWup.bind(this);
    this.fireBullet = this.fireBullet.bind(this);
  }

  fireBullet = (playerIndex: number) => {
    return () => {
      const playerState = this.state.player.slice();
      const { position, angle } = playerState[playerIndex];
      const theta = angle * (Math.PI / 180);
      const oneMoreBullet = this.state.bullet.slice();
      oneMoreBullet.push({
        position: {
          x: position.x + Constants.bulletAdvance * Math.cos(theta),
          y: position.y + Constants.bulletAdvance * Math.sin(theta),
        },
        angle,
        age: 0,
      });
      this.setState({ bullet: oneMoreBullet });
    };
  }

  genericKeypress(turnDirection: Constants.directions, targetValue: boolean) {
    return (playerIndex: number) => {
      return () => {
        const playerState = this.state.player.slice();
        playerState[playerIndex][turnDirection] = targetValue;
        this.setState({ player: playerState });
      };
    };
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  updateGame() {
    this.collisionDetected();

    this.setState({
      player: this.computeNextPlayerState(),
      bullet: this.computeNextBulletState(),
    });
  }

  computeNextPlayerState() {
    return this.state.player.slice().map(p => {
      if (p.health > 0) {
        // If turning, adjust the angle
        let newAngle = p.angle;
        if (p.turningCW && !p.turningCCW) {
          newAngle += Constants.deltaTheta;
        } else if (!p.turningCW && p.turningCCW) {
          newAngle -= Constants.deltaTheta;
        }
        p.angle = newAngle % 360; // Stop this getting out of hand

        // Advance position
        const { x, y } = p.position;
        const theta = p.angle * (Math.PI / 180);
        p.position = {
          x: x + Constants.speed * Math.cos(theta),
          y: y + Constants.speed * Math.sin(theta),
        };
      }
      return p;
    });
  }

  computeNextBulletState() {
    return this.state.bullet
      .slice()
      .map(b => {
        // Advance position
        const { x, y } = b.position;
        const theta = b.angle * (Math.PI / 180);
        b.position = {
          x: x + Constants.bulletSpeed * Math.cos(theta),
          y: y + Constants.bulletSpeed * Math.sin(theta),
        };

        // Age bullets
        b.age = b.age + 1;
        return b;
      })
      .filter(b => b.age < Constants.bulletLifetime); // Remove old bullets from playfield
  }

  collisionDetected() {
    // Player vs player
    const playerStates = this.state.player.slice();
    getPairs(this.state.player.length).forEach(pair => {
      const [player1Index, player2Index] = pair;
      // for each of the 4 points on the square boundary of player 2,
      // test inclusion against every line on the boundary of player 1
      const { position: p2Pos, angle: p2Angle } = playerStates[player2Index];
      const p2Points = getPoints(p2Pos, p2Angle, [
        360 - 45,
        180 + 45,
        180 - 45,
        45,
      ]);

      const { position: p1Pos, angle: p1Angle } = playerStates[player1Index];
      const p1Boundary = getCoefficients(p1Pos, p1Angle);
      const playerCollision = p2Points.some(point => {
        return isInside(point, p1Boundary);
      });

      if (playerCollision) {
        // console.log(`Players ${player1Index} and ${player2Index} collided`);
        [player1Index, player2Index].forEach(i => {
          playerStates[i].health = 0;
        });
      }
    });

    // Bullets vs players
    playerStates.forEach(player => {
      const { position, angle } = player;
      const boundary = getCoefficients(position, angle);
      this.state.bullet.forEach(bullet => {
        if (isInside(bullet.position, boundary)) {
          // console.log(`Player ${player.colour} hit`);
          player.health -= 10;
          bullet.age += Constants.bulletLifetime; // destroy the bullet
        }
      });
    });

    // Players vs walls
    playerStates.forEach(player => {
      const { x, y } = player.position;
      if (
        x < 0 ||
        x > Constants.fieldWidth ||
        y < 0 ||
        y > Constants.fieldHeight
      ) {
        player.health = 0;
      }
    });

    this.setState({ player: playerStates });
  }

  toggleGameState() {
    if (this.state.isPaused) {
      this.timeInterval = setInterval(this.updateGame.bind(this), 33);
    } else {
      clearInterval(this.timeInterval);
    }
    this.setState({ isPaused: !this.state.isPaused });
  }

  render() {
    const players = [...Array(this.state.player.length).keys()].map(i => {
      return (
        <Player
          key={i}
          state={this.state.player[i]}
          keyHandlers={this.keyHandlers.map(f => f(i))}
        />
      );
    });

    const bullets: JSX.Element[] = [];
    this.state.bullet.forEach((b, i) => {
      bullets.push(<Bullet key={i} position={b.position} />);
    });

    return (
      <div>
        <button onClick={this.toggleGameState.bind(this)}>
          {this.state.isPaused ? 'Start' : 'Stop'}
        </button>

        <div
          style={{
            width: Constants.fieldWidth,
            height: Constants.fieldHeight,
            background: 'skyblue',
            overflow: 'hidden',
          }}
        >
          {players}
          {bullets}
        </div>
      </div>
    );
  }
}
