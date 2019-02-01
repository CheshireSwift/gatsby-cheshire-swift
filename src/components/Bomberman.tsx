import React = require('react');
import * as BombermanMap from './BombermanMap';
import styled from '../../node_modules/react-emotion';

interface GameState {
  map: string[];
  width: number;
  higth: number;
}

const GameDescriptionDiv = styled('div')`
  position: right;
`;
type possibleDirections = 'up' | 'down' | 'left' | 'right' | 'bomb';

export class BombermanGame extends React.Component<{}, GameState> {
  p1Alive: boolean;
  p2Alive: boolean;
  updatedMap: string[];
  timer: number;
  actions: possibleDirections[] = [];
  actionAgents: string[] = [];
  constructor(props: {}) {
    super(props);
    this.game = this.game.bind(this);
    this.buttonpress = this.buttonpress.bind(this);
    const initMap = new Array(15 * 15).fill('empty');
    initMap[0] = 'p1';
    initMap[15 * 15 - 1] = 'p2';
    for (let i = 1; i < 15 * 15 - 1; i++) {
      if (Math.floor(Math.random() * 2) === 1) {
        initMap[i] = 'wall';
      }
    }
    const startingField = [1, 15, 16, 15 * 15 - 2, 15 * 15 - 16, 15 * 15 - 17];
    startingField.forEach((location: number) => {
      initMap[location] = 'empty';
    });
    this.state = {
      higth: 15,
      map: initMap,
      width: 15,
    };
  }
  isAccesible(location: number, targetLocation: number): boolean {
    return !(
      targetLocation < 0 ||
      targetLocation > this.state.width * this.state.higth ||
      (targetLocation % this.state.width === 0 &&
        location % this.state.width === this.state.width - 1) ||
      (targetLocation % this.state.width === this.state.width - 1 &&
        location % this.state.width === 0) ||
      this.updatedMap[targetLocation] !== 'empty'
    );
  }

  move(direction: possibleDirections, player: string) {
    let location = -1;
    for (let i = 0; i < this.updatedMap.length; i++) {
      if (this.updatedMap[i].slice(0, 2) === player) {
        location = i;
      }
    }
    let targetLocation = -1;
    switch (direction) {
      case 'up':
        targetLocation = location - this.state.width;
        break;
      case 'down':
        targetLocation = location + this.state.width;
        break;
      case 'left':
        targetLocation = location - 1;
        break;
      case 'right':
        targetLocation = location + 1;
        break;
    }
    if (this.isAccesible(location, targetLocation)) {
      const currentTile = this.updatedMap[location];
      if (currentTile.length !== 2) {
        this.updatedMap[location] = currentTile.slice(2, 7);
        this.updatedMap[targetLocation] = player;
      } else {
        this.updatedMap[location] = 'empty';
        this.updatedMap[targetLocation] = player;
      }
    }
  }

  buttonpress(event: any) {
    let agent: string;
    let action: possibleDirections;
    switch (event.charCode) {
      case 119:
        agent = 'p1';
        action = 'up';
        break;
      case 97:
        agent = 'p1';
        action = 'left';
        break;
      case 115:
        agent = 'p1';
        action = 'down';
        break;
      case 100:
        agent = 'p1';
        action = 'right';
        break;
      case 113:
        agent = 'p1';
        action = 'bomb';
        break;
      case 117:
        agent = 'p2';
        action = 'bomb';
        break;
      case 105:
        agent = 'p2';
        action = 'up';
        break;
      case 106:
        agent = 'p2';
        action = 'left';
        break;
      case 107:
        agent = 'p2';
        action = 'down';
        break;
      case 108:
        agent = 'p2';
        action = 'right';
        break;
      case 13:
        this.updatedMap = this.state.map;
        this.timer = 0;
        this.actions = [];
        this.actionAgents = [];
        this.p1Alive = true;
        this.p2Alive = true;
        setInterval(this.game, 150);
        break;
    }
    if (agent) {
      this.actionAgents.push(agent);
      this.actions.push(action);
    }
  }

  game() {
    this.timer = this.timer === 6 ? 0 : this.timer + 1;
    if (this.timer === 0) {
      this.ageBombs();
    }
    this.executeActions();
    this.setState({
      map: this.updatedMap,
    });
    if (!this.p1Alive && !this.p2Alive) {
      alert('Draw!!');
      location.reload();
    }
    if (!this.p1Alive) {
      alert('Player 2 has won!!!');
      location.reload();
    }
    if (!this.p2Alive) {
      alert('Player 1 has won!!!');
      location.reload();
    }
  }

  executeActions() {
    for (let i = 0; i < this.actions.length; i++) {
      if (this.actions[i] === 'bomb') {
        this.setBomb(this.actionAgents[i]);
      } else {
        this.move(this.actions[i], this.actionAgents[i]);
      }
    }
    this.actions = [];
    this.actionAgents = [];
  }

  setBomb(player: string) {
    const location = this.updatedMap.indexOf(player);
    this.updatedMap[location] = player + 'bomb1';
  }

  ageBombs() {
    const explosions = [];
    const updatedMap: string[] = this.updatedMap;
    for (let i = 0; i < this.state.width * this.state.higth; i++) {
      if (updatedMap[i] === 'fire') {
        updatedMap[i] = 'empty';
      }
      switch (
        updatedMap[i].slice(updatedMap[i].length - 5, updatedMap[i].length)
      ) {
        case 'bomb1':
          updatedMap[i].length === 5
            ? (updatedMap[i] = 'bomb2')
            : (updatedMap[i] = updatedMap[i].slice(0, 2) + 'bomb2');
          break;
        case 'bomb2':
          updatedMap[i].length === 5
            ? (updatedMap[i] = 'bomb3')
            : (updatedMap[i] = updatedMap[i].slice(0, 2) + 'bomb3');
          break;
        case 'bomb3':
          if (updatedMap[i].slice(0, 2) === 'p1') {
            this.p1Alive = false;
          }
          if (updatedMap[i].slice(0, 2) === 'p2') {
            this.p2Alive = false;
          }
          updatedMap[i] = 'fire';
          explosions.push(i);
          break;
      }
    }
    explosions.forEach((location: number) => {
      this.explosionAt(location);
    });
    this.updatedMap = updatedMap;
  }

  explosionAt(location: number) {
    const newMap = this.updatedMap;
    const directions = [1, -1, this.state.width, -this.state.width];
    const chain: number[] = [];
    let fireAt: number;
    directions.forEach((direction: number) => {
      fireAt = location + direction;
      while (
        (newMap[fireAt] === 'empty' || newMap[fireAt] === 'fire') &&
        this.onMap(fireAt, direction)
      ) {
        newMap[fireAt] = 'fire';
        fireAt += direction;
      }
      if (this.onMap(fireAt, direction)) {
        if (
          newMap[fireAt].slice(
            newMap[fireAt].length - 5,
            newMap[fireAt].length - 1,
          ) === 'bomb'
        ) {
          chain.push(fireAt);
        }
        if (newMap[fireAt].slice(0, 2) === 'p1') {
          this.p1Alive = false;
        }
        if (newMap[fireAt].slice(0, 2) === 'p2') {
          this.p2Alive = false;
        }
        newMap[fireAt] = 'fire';
      }
    });
    chain.forEach((bomb: number) => {
      this.explosionAt(bomb);
    });
    this.updatedMap = newMap;
  }

  onMap(targetLocation: number, direction: number) {
    return !(
      targetLocation < 0 ||
      targetLocation >= this.state.width * this.state.higth ||
      (targetLocation % this.state.width === 0 && direction === 1) ||
      (targetLocation % this.state.width === this.state.width - 1 &&
        direction === -1)
    );
  }

  render() {
    return (
      <div
        className="game"
        data-size="A4"
        onKeyPress={this.buttonpress}
        tabIndex={-1}
      >
        <BombermanMap.BombermanBoard
          width={this.state.width}
          higth={this.state.higth}
          contents={this.state.map}
        />

        <GameDescriptionDiv>
          Press enter to begin. Controls: player 1 : WASD, Q for bombs. player 2
          : IJKL, U for bombs.
        </GameDescriptionDiv>
      </div>
    );
  }
}
