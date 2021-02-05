import GameInterface from './gameInterface';
import Ball from './ball';
import Square from './square';
import Tray from './tray';

export default class BreakoutGame extends GameInterface {
  ball: Ball;
  tray: Tray;
  squares: Square[];
  inGame: boolean;
  firstKey: boolean;

  constructor() {
    super();

    // super parameters
    this.trayStep = 25;
    this.waitTime = 20;

    this.gameHeight = 587;
    this.gameWidth = 1048;

    this.trayHeight = 15;
    this.trayWidth = 150;

    this.ballRadius = 6;

    this.velocityFirst = 3.5;
    this.velocityIncrease = 0.08;

    this.directionFirst = 300;

    this.squareWidth = 30;
    this.squareHeight = 30;

    this.velocity = this.velocityFirst;
    this.ballDirection = this.directionFirst;

    this.score = 0;
    this.firstKey = true;
  }

  keyPressed = (onKeyEvent: any) => {
    // Start the game on first keystroke
    if (this.firstKey) {
      this.startGame();
      this.firstKey = false;
    }
    if (onKeyEvent.charCode === 65 || onKeyEvent.charCode === 97) {
      this.moveTray(-1);
      return;
    }
    if (onKeyEvent.charCode === 68 || onKeyEvent.charCode === 100) {
      this.moveTray(1);
      return;
    }
  }

  startGame() {
    console.log('Game has started');
    this.ball = new Ball(this, { x: 100, y: 490 });
    this.tray = new Tray(this, { x: 50, y: 505 });
    this.squares = [];
    // Intentionally starting from 1
    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 5; j++) {
        this.squares.push(new Square({ x: 0 + i * 90, y: j * 73 - 23 }, this));
      }
    }
    this.inGame = true;
    setTimeout(() => this.updateGame(this), this.waitTime);
  }

  updateGame(game: BreakoutGame) {
    const canvas: HTMLCanvasElement = document.querySelector('.gameCanvas');
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');

    game.ball.moveBall();
    game.ball.detectCollision(game.tray, game.squares);
    if (game.ball.hasFallen(game.tray)) {
      game.gameOver();
    }

    // Clear canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    game.tray.draw(canvasContext);
    game.ball.draw(canvasContext);
    game.squares.forEach(square => {
      square.draw(canvasContext);
    });

    // Reset timer
    if (game.inGame) {
      setTimeout(() => game.updateGame(game), game.waitTime);
    }
  }

  moveTray(direction: number) {
    if (this.inGame) {
      this.tray.move(direction);
    }
  }

  gameOver() {
    this.inGame = false;
    console.log('Game over');
  }
}
