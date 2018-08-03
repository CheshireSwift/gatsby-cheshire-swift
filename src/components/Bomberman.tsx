import React = require('react');
import * as BombermanMap from './BombermanMap';

interface GameState {
  map: string[];
  width: number;
  higth: number;
}

type possibleDirections = 'up' | 'down' | 'left' | 'right' | 'bomb';

export class BombermanGame extends React.Component<{}, GameState> {
  updatedMap: string[];
  timer: number;
  actions: possibleDirections[];
  actionAgents: string[];
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
    const location = this.updatedMap.indexOf(player);
    console.log(`'executing movements' at ${location}`);
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
      const tempMap = this.updatedMap;
      tempMap[targetLocation] = tempMap[location];
      tempMap[location] = 'empty';
      this.updatedMap = tempMap;
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
      case 112:
        agent = 'p2';
        action = 'bomb';
        break;
      case 91:
        agent = 'p2';
        action = 'up';
        break;
      case 59:
        agent = 'p2';
        action = 'left';
        break;
      case 39:
        agent = 'p2';
        action = 'down';
        break;
      case 35:
        agent = 'p2';
        action = 'right';
        break;
      case 32:
        this.updatedMap = this.state.map;
        this.timer = 0;
        this.actions = [];
        this.actionAgents = [];
        setInterval(this.game, 150);
        break;
    }
    this.actionAgents.push(agent);
    this.actions.push(action);
  }

  game() {
    this.timer = this.timer === 9 ? 0 : this.timer + 1;
    if (this.timer === 0) {
      this.ageBombs();
    }
    this.executeActions();
    this.setState({
      map: this.updatedMap,
    });
    if (
      this.state.map.indexOf('p1') === -1 &&
      this.state.map.indexOf('p2') === -1
    ) {
      alert('Draw!!');
    }
    if (this.state.map.indexOf('p1') === -1) {
      alert('Player 2 has won!!!');
    }
    if (this.state.map.indexOf('p2') === -1) {
      alert('Player 1 has won!!!');
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
    console.log('setting bombs');
    const newMap = this.updatedMap;
    const location = newMap.indexOf(player);
    newMap[location] = 'bomb1';
    const possibleLocations: number[] = [
      location + 1,
      location - 1,
      location + this.state.width,
      location - this.state.width,
    ];
    let canMove: boolean = false;
    for (let i = 0; i < 4; i++) {
      if (this.isAccesible(location, possibleLocations[i])) {
        canMove = true;
      }
    }
    if (canMove) {
      let targetLocation = possibleLocations[Math.floor(Math.random() * 4)];
      while (!this.isAccesible(location, targetLocation)) {
        targetLocation = possibleLocations[Math.floor(Math.random() * 4)];
      }
      newMap[targetLocation] = player;
      this.updatedMap = newMap;
    }
  }

  ageBombs() {
    const explosions = [];
    const updatedMap: string[] = this.updatedMap;
    for (let i = 0; i < this.state.width * this.state.higth; i++) {
      switch (updatedMap[i]) {
        case 'bomb1':
          updatedMap[i] = 'bomb2';
          break;
        case 'bomb2':
          updatedMap[i] = 'bomb3';
          break;
        case 'bomb3':
          updatedMap[i] = 'fire';
          explosions.push(i);
          break;
        case 'fire':
          updatedMap[i] = 'empty';
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
          newMap[fireAt] === 'bomb1' ||
          newMap[fireAt] === 'bomb2' ||
          newMap[fireAt] === 'bomb3'
        ) {
          chain.push(fireAt);
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
      <div className="game" data-size="A4">
        <div className="gameMap">
          <BombermanMap.BombermanBoard
            width={this.state.width}
            higth={this.state.higth}
            contents={this.state.map}
          />
        </div>
        <div className="KeyBoard">
          <input type="text" id="one" onKeyPress={this.buttonpress} />
        </div>
      </div>
    );
  }
}
