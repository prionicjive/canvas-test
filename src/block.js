export class Block {
  x;
  y;
  dx;
  dy;
  size;
  speed;
  fillStyle;

  constructor(x, y, size = 16, speed = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
}
