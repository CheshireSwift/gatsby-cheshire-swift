import * as React from 'react';
import * as Constants from './game-constants';
import { Bullet } from './bullet';
import { Player } from './player';
import * as Geometry from './geometry';
import { initialPlayers } from './initialPlayers';
import * as _ from 'lodash';
import { HelpScreen } from './help-screen';

interface BulletState {
  position: Constants.Vector;
  angle: number;
  age: number;
}

interface SkyState {
  isPaused: boolean;
  isHelpHidden: boolean;
  player: Constants.PlayerState[];
  bullet: BulletState[];
  timerToken: number;
}

export class Sky extends React.Component<{}, SkyState> {
  CCWdown = this.createPropertySettingCallback('turningCCW', true);
  CCWup = this.createPropertySettingCallback('turningCCW', false);
  CWdown = this.createPropertySettingCallback('turningCW', true);
  CWup = this.createPropertySettingCallback('turningCW', false);

  constructor(props: {}) {
    super(props);
    this.state = {
      isPaused: true,
      isHelpHidden: true,
      player: initialPlayers,
      bullet: [],
      timerToken: 0,
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

  createPropertySettingCallback(turnDirection: string, targetValue: boolean) {
    return (playerIndex: number) => {
      return () => {
        const playerState = this.state.player.slice();
        playerState[playerIndex][turnDirection] = targetValue;
        this.setState({ player: playerState });
      };
    };
  }

  // componentDidMount() {
  //   // Bind all the player keys
  //   _.range(this.state.player.length).forEach(playerIndex => {
  //     const keyHandlers = this.state.player.keys;
  //     Object(keyHandlers).entries().forEach((propertySet: {property: string, value: boolean}) => {
  //       const {property, value} = propertySet;
  //       this.createPropertySettingCallback(playerIndex)(property, value);
  //     });
  //   });
  // }

  componentWillUnmount() {
    clearInterval(this.state.timerToken);
  }

  updateGame() {
    this.detectCollisions();

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

  detectCollisions() {
    const playerStates = this.state.player.slice();
    // Bullets vs players
    playerStates.forEach(player => {
      const { position, angle } = player;
      const boundary = Geometry.getCoefficients(position, angle);
      this.state.bullet.forEach(bullet => {
        if (Geometry.isInside(bullet.position, boundary)) {
          console.log(`Player ${player.hue} hit`);
          player.health -= Constants.bulletDamage;
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
      const timerToken = setInterval(this.updateGame.bind(this), 33);
      this.setState({ timerToken });
    } else {
      clearInterval(this.state.timerToken);
    }
    this.setState({ isPaused: !this.state.isPaused });
  }

  toggleHelpScreen() {
    this.setState({ isHelpHidden: !this.state.isHelpHidden });
  }

  setNumberOfPlayers(e: any) {
    this.setState({ player: initialPlayers.slice(0, e.target.value) });
  }

  render() {
    const keyHandlers = [
      this.CWdown,
      this.CWup,
      this.CCWdown,
      this.CCWup,
      this.fireBullet,
    ];

    const players = _.range(this.state.player.length).map(i => {
      return (
        <Player
          key={i}
          state={this.state.player[i]}
          keyHandlers={keyHandlers.map(f => f(i))}
        />
      );
    });

    const bullets: JSX.Element[] = [];
    this.state.bullet.forEach((b, i) => {
      bullets.push(<Bullet key={i} position={b.position} />);
    });

    return (
      <div
        style={{
          height: Constants.fieldHeight,
        }}
      >
        <button onClick={this.toggleGameState.bind(this)}>
          {this.state.isPaused ? 'Start' : 'Stop'}
        </button>

        <button onClick={this.toggleHelpScreen.bind(this)}>
          {this.state.isHelpHidden ? 'Show Help' : 'Hide Help'}
        </button>

        <input
          type="number"
          id="nPlayers"
          name="nPlayers"
          placeholder="Number of players"
          min="1"
          max="3"
          onChange={this.setNumberOfPlayers.bind(this)}
        />

        <div
          style={{
            width: Constants.fieldWidth,
            height: Constants.fieldHeight,
            background: 'linear-gradient(skyblue, white)',
            overflow: 'hidden',
            position: 'absolute',
            borderRadius: 15,
          }}
        >
          {players}
          {bullets}
        </div>
        <HelpScreen isHelpHidden={this.state.isHelpHidden} />
      </div>
    );
  }
}
