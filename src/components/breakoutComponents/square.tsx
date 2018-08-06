import GameInterface from './gameInterface';
interface Position {
  x: number;
  y: number;
}

export default class Square {
  position: Position;
  alive: boolean;
  game: GameInterface;

  constructor(position: Position, game: GameInterface, alive = true) {
    this.position = position;
    this.game = game;
    this.alive = alive;
  }

  kill() {
    if (this.alive) {
      this.alive = false;
      this.game.score++;
    } else {
      console.log('WARNING: You are about to kill an already dead square');
    }
  }

  revive() {
    if (!this.alive) {
      this.alive = true;
    } else {
      console.log('WARNING: You are about to revive an already alive square');
    }
  }

  draw(canvas: CanvasRenderingContext2D) {
    if (this.alive) {
      canvas.fillStyle = 'rgb(0, 0, 255)';
      canvas.fillRect(
        this.position.x,
        this.position.y,
        this.game.squareWidth,
        this.game.squareHeight,
      );
    }
  }
}
