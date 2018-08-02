import React = require('react');
import * as BombermanMap from './BombermanMap';

interface GameState {
  map: string[];
  width: number;
  higth: number;
}

export class BombermanGame extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    const initMap = new Array(15 * 15).fill('empty');
    initMap[0] = 'p1';
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
        location % this.state.width === 0)
    );
  }

  move(direction: string, player: string) {
    const location = this.state.map.indexOf(player);
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
    }
    if (this.isAccesible(location, targetLocation)) {
      const tempMap = this.state.map;
      tempMap[targetLocation] = tempMap[location];
      tempMap[location] = 'empty';
      this.setState({
        map: tempMap,
      });
    }
  }

  moveButton(direction: string, player: string) {
    return (
      <li key={direction}>
        <button
          onClick={() => {
            this.move(direction, player);
          }}
        >
          Move {direction}
        </button>
      </li>
    );
  }

  moveButtons(): any {
    const directions = ['up', 'down', 'left', 'right'];
    const returnArray: any = [];
    directions.forEach((direction: string) => {
      returnArray.push(this.moveButton(direction, 'p1'));
    });
    return returnArray;
  }
  render() {
    return (
      <div className="game">
        <div className="gameMap">
          <BombermanMap.BombermanBoard
            width={this.state.width}
            higth={this.state.higth}
            contents={this.state.map}
          />
        </div>
        <div className="controls">{this.moveButtons()}</div>
      </div>
    );
  }
}
