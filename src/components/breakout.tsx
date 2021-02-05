import * as React from 'React';
import BreakoutGame from './breakoutComponents/game';

export default class Breakout extends React.Component {
  game: BreakoutGame;
  constructor(props: {}) {
    super(props);
    this.game = new BreakoutGame();
  }

  render() {
    return (
      <div
        className="gameWrapper"
        tabIndex={-1}
        onKeyPress={this.game.keyPressed}
      >
        <canvas className="gameCanvas" id="game" width="1048" height="587" />
      </div>
    );
  }

  keyPressed = (onKeyEvent: any) => {
    console.log(onKeyEvent);
    console.log(`Key pressed: ${onKeyEvent.charCode}`);
  }
}
