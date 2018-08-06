import * as React from 'react';
import * as Constants from '../game-of-life/game-constants';

interface BulletProps {
  position: Constants.Vector;
}

const bulletSize = 5;
export class Bullet extends React.PureComponent<BulletProps> {
  render() {
    const { x, y } = this.props.position;
    return (
      <div
        style={{
          background: 'black',
          height: bulletSize,
          width: bulletSize,
          position: 'absolute',
          top: y - bulletSize / 2,
          left: x - bulletSize / 2,
          transition: 'all 0.05s',
        }}
      />
    );
  }
}
