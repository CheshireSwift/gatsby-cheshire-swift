import * as React from 'react';
import * as Constants from './game-constants';

interface PlayerProps {
  state: Constants.PlayerState;
  keyHandlers: Array<() => void>;
}

export class Player extends React.Component<PlayerProps, {}> {
  render() {
    const { x, y } = this.props.state.position;
    const angle = this.props.state.angle;
    const isAlive = this.props.state.health > 0;
    return (
      <div
        style={{
          background: isAlive ? this.props.state.colour : '#000',
          height: Constants.sideLength,
          width: Constants.sideLength,
          position: 'absolute',
          top: y - Constants.sideLength / 2,
          left: x - Constants.sideLength / 2,
          transform: `rotate(${angle}deg)`,
          transition: 'all 0.05s',
        }}
      />
    );
  }

  handleKeyDown = (e: KeyboardEvent) => {
    // UNCLEAR, maybe replace with object literals so the indices are meaningful?
    // But then I can't map the player index over the curried functions in keyHandlers
    switch (e.code) {
      case this.props.state.keyCodes[0]:
        this.props.keyHandlers[2]();
        break;
      case this.props.state.keyCodes[1]:
        this.props.keyHandlers[0]();
        break;
      case this.props.state.keyCodes[2]:
        this.props.keyHandlers[4]();
      default:
        return;
    }
  }

  handleKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case this.props.state.keyCodes[0]:
        this.props.keyHandlers[3]();
        break;
      case this.props.state.keyCodes[1]:
        this.props.keyHandlers[1]();
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
}
