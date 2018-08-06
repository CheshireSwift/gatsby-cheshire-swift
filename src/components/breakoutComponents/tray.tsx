interface Position {
  x: number;
  y: number;
}

export default class Tray {
  game: any;
  position: Position;
  pastPosition: Position;

  constructor(game: any, position: Position) {
    this.position = { x: position.x, y: position.y };
    this.game = game;
    this.pastPosition = position;
  }

  // Direction: 1 or -1 (right or left)
  move(direction: number) {
    this.position.y = this.position.y;
    const delta = direction * this.game.trayStep;
    this.pastPosition = this.position;
    this.position.x += delta;

    // Bouncing in the edges
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.game.trayWidth > this.game.gameWidth) {
      this.position.x = this.game.gameWidth - this.game.trayWidth;
    }

    // Redraw tray
    const canvas: HTMLCanvasElement = document.querySelector('.gameCanvas');
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(
      0,
      this.position.y,
      canvas.width,
      this.game.trayHeight,
    );
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = 'rgb(255, 0, 0)';
    canvas.fillRect(
      this.position.x,
      this.position.y,
      this.game.trayWidth,
      this.game.trayHeight,
    );
  }
}

// module.exports = { Tray };
