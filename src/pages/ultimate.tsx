import * as React from 'react';
import * as _ from 'lodash';

enum Winner {
  Noughts,
  Crosses,
  Draw,
}

interface Cell {
  winner?: Winner;
}

interface Board {
  cells: Cell[];
  winner?: Winner;
}

interface GameState {
  boards: Board[];
}

export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      boards: _.times(9, i => ({
        cells: _.times(9, j => ({ winner: null })),
        winner: null,
      })),
    };
  }

  render(): false {
    return false;
  }
}

export default Game;
