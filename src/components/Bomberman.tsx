import React = require('react');
import * as BombermanMap from './BombermanMap';

export class BombermanGame extends React.Component {
  render() {
    return (
      <div className="game">
        <BombermanMap.BombermanBoard
          width={15}
          higth={15}
          contents={new Array(15 * 15).fill('Empty')}
        />
      </div>
    );
  }
}
