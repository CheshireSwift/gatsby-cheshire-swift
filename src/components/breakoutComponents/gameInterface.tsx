export default class GameInterface {
  gameWidth: number;
  gameHeight: number;

  trayStep: number;
  trayWidth: number;
  trayHeight: number;

  velocityFirst: number;
  velocityIncrease: number;
  velocity: number;
  directionFirst: number;

  ballRadius: number;
  ballDirection: number;

  squareHeight: number;
  squareWidth: number;

  score: number;
  waitTime: number;

  constructor() {
    console.log('Interface constructor called');
  }

  play() {
    throw new Error('Play method must be implemented');
  }
}

// module.exports = { GameInterface };
