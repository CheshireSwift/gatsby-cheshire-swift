import Square from './square';
import Tray from './tray';
import GameInterface from './gameInterface';

interface Position {
  x: number;
  y: number;
}

export default class Ball {
  game: GameInterface;
  position: Position;
  pastPosition: Position;

  constructor(game: GameInterface, position: Position) {
    this.game = game;
    this.position = position;
    this.pastPosition = position;
  }

  moveBall() {
    this.pastPosition = this.position;
    this.position.x +=
      this.game.velocity * Math.cos((this.game.ballDirection * Math.PI) / 180);
    this.position.y +=
      this.game.velocity * Math.sin((this.game.ballDirection * Math.PI) / 180);
  }

  // Detects collision with other elements and border wall
  detectCollision(tray: Tray, squares: Square[]) {
    this.game.ballDirection = this.game.ballDirection % 360;

    // Collision with wall
    // top wall
    if (this.position.y - this.game.ballRadius < 0) {
      this.game.ballDirection = 360 - this.game.ballDirection;
    }
    // left wall
    if (this.position.x - this.game.ballRadius < 0) {
      this.game.ballDirection = 180 - this.game.ballDirection;
    }
    // right wall
    if (this.position.x + this.game.ballRadius > this.game.gameWidth) {
      this.game.ballDirection = 180 - this.game.ballDirection;
    }

    // Collision with tray
    if (
      this.position.y + this.game.ballRadius > tray.position.y &&
      this.position.x > tray.position.x &&
      this.position.x < tray.position.x + this.game.trayWidth
    ) {
      // You can have a certain degree of control over direciton
      const centreDelta =
        tray.position.x + this.game.trayWidth / 2 - this.position.x;
      const directionAdjust = (0.4 / this.game.trayWidth) * centreDelta * 100;
      console.log(`Old direction: ${this.game.ballDirection}`);
      this.game.ballDirection = 360 - this.game.ballDirection - directionAdjust;
      console.log(`New direction: ${this.game.ballDirection}`);
      console.log(`Direction adjust: ${directionAdjust}`);
    }

    // Collision with squares (I know, ugly...)
    squares.forEach(square => {
      if (!square.alive) {
        return;
      }

      // If it was top or bottom
      if (
        square.position.x < this.position.x &&
        this.position.x < square.position.x + this.game.squareWidth
      ) {
        // If it was top
        if (
          square.position.y < this.position.y + this.game.ballRadius &&
          this.position.y + this.game.ballRadius <
            square.position.y + this.game.squareHeight
        ) {
          square.kill();
          this.game.ballDirection = 360 - this.game.ballDirection;
          console.log('Square was hit from top');
          return;
        }
        // If it was bottom
        if (
          square.position.y < this.position.y - this.game.ballRadius &&
          this.position.y - this.game.ballRadius <
            square.position.y + this.game.squareHeight
        ) {
          square.kill();
          this.game.ballDirection = 360 - this.game.ballDirection;
          console.log('Square was hit from bottom');
          return;
        }
      }

      // If it was from right or left
      if (
        square.position.y < this.position.y &&
        this.position.y < square.position.y + this.game.squareHeight
      ) {
        // if it was left
        if (
          square.position.x < this.position.x + this.game.ballRadius &&
          this.position.x + this.game.ballRadius <
            square.position.x + this.game.squareWidth
        ) {
          square.kill();
          this.game.ballDirection = 180 - this.game.ballDirection;
          console.log('Square was hit from left');
          return;
        }

        // if it was right
        if (
          square.position.x < this.position.x - this.game.ballRadius &&
          this.position.x - this.game.ballRadius <
            square.position.x + this.game.squareWidth
        ) {
          square.kill();
          this.game.ballDirection = 180 - this.game.ballDirection;
          console.log('Square was hit from right');
        }
      }
    });
  }

  // Returns wether the ball has fallen down
  hasFallen(tray: Tray) {
    if (this.position.y > tray.position.y) {
      console.log('Checking if fallen');
      if (
        this.position.x < tray.position.x ||
        this.position.x > tray.position.x + this.game.trayWidth
      ) {
        console.log('Fall detected');
        return true;
      }
    }

    return false;
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.beginPath();
    canvas.arc(
      this.position.x,
      this.position.y,
      this.game.ballRadius,
      0,
      2 * Math.PI,
    );
    canvas.stroke();
    // canvas.fill();
  }
}
