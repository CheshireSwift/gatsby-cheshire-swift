// Game constants
export const deltaTheta = 10; // How many degrees a player rotates on each time step if the key is held down
export const playerHeight = 34;
export const playerWidth = 68;
export const bulletAdvance = playerWidth; // How far in front of a player a bullet materialises
export const bulletLifetime = 25; // How long a fired bullet lives on the play field

export const speed = 10; // How fast players move
export const bulletSpeed = 12; // How fast bullets move
export const bulletDamage = 20; // How much health a player loses when hit by a bullet
export const fieldWidth = 1000;
export const fieldHeight = 500;

export interface Vector {
  x: number;
  y: number;
}

export interface Line {
  // Coefficients of line AX + By + C <= 0
  A: number;
  B: number;
  C: number;
}

export interface PlayerState {
  position: Vector;
  angle: number;
  turningCW: boolean;
  turningCCW: boolean;
  keyCodes: string[];
  hue: number;
  health: number;
}
