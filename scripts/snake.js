import { Direction } from "../models/MyEnums.js";

export class Snake {
  Xpos;
  Ypos;
  scaleSize;
  body;
  head;
  direction;

  gameContext;

  constructor(gameContext) {
    this.Xpos = 100;
    this.Ypos = 100;

    this.gameContext = gameContext;
    this.scaleSize = gameContext.cellSize;

    this.direction = Direction.right;
    this.body = [{ Xpos: this.Xpos, Ypos: this.Ypos }];
    this.head = this.body[0];

    this.eatingAudio = new Audio("./assets/audio/eat.m4a");
  }

  navigate(keyCode) {
    if (keyCode == "38" || (!keyCode && this.direction === Direction.up)) {
      this.move(0, -1);
      this.direction = Direction.up;
    } else if (keyCode == "40" || (!keyCode && this.direction === Direction.down)) {
      this.move(0, 1);
      this.direction = Direction.down;
    } else if (keyCode == "37" || (!keyCode && this.direction === Direction.left)) {
      this.move(-1, 0);
      this.direction = Direction.left;
    } else if (keyCode == "39" || (!keyCode && this.direction === Direction.right)) {
      this.move(1, 0);
      this.direction = Direction.right;
    }
  }

  move(x, y) {
    const newX = this.head.Xpos + x * this.scaleSize;
    const newY = this.head.Ypos + y * this.scaleSize;
    const isWdithValid = -this.scaleSize <= newX && newX <= this.gameContext.canvasWidth;
    const isHeightValid = -this.scaleSize <= newY && newY <= this.gameContext.canvasHeight;
    if (isWdithValid && isHeightValid) {
      for (let i = 0; i < this.body.length - 1; i++) {
        this.body[i].Xpos = this.body[i + 1].Xpos;
        this.body[i].Ypos = this.body[i + 1].Ypos;
      }
      [this.head.Xpos, this.head.Ypos] = [newX, newY];
    }
  }

  eat(foodX, foodY) {
    this.eatingAudio.play();
    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i].Xpos = this.body[i + 1].Xpos;
      this.body[i].Ypos = this.body[i + 1].Ypos;
    }
    this.body.unshift({ Xpos: foodX, Ypos: foodY });
  }
}
