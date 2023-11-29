import { Snake } from "./snake.js";
import { Food } from "./food.js";
import { gameCanvas } from "./gameCanvas.js";
import { GameContext } from "../models/gameContext.js";

//Game class reperesnting the basic setup and settings
class Game {
  canvas;
  snake;
  food;
  interval;

  gameContext;

  constructor() {
    document.addEventListener("keydown", this.gameLoop);
    this.gameContext = new GameContext();
  }

  setUpGameCanvas = () => {
    //building game context as the game object's are being instanciated
    this.canvas = new gameCanvas(document.getElementById("gameCanvas"));
    if (this.canvas.ctx) {
      this.gameContext.canvasHeight = this.canvas.height;
      this.gameContext.canvasWidth = this.canvas.width;
      this.gameContext.cellSize = this.canvas.cellSize;

      this.snake = new Snake(this.gameContext);
      this.gameContext.snakeBody = this.snake.body;

      this.food = new Food(this.gameContext);
      this.gameContext.food = this.food;

      this.setUpGameLoop();
    }
  };

  gameLoop = (event = null) => {
    if (event?.key.toLowerCase() === "p" && !this.canvas) {
      this.setUpGameCanvas();
    } else if (event?.key === " ") {
      this.togglePause();
    } else if (event?.key.toLowerCase() === "e") {
      this.endGame();
    } else if (!this.isGameOver()) {
      this.interval && this.renderNextFrame(event);
    } else {
      this.endGame();
    }
  };

  renderNextFrame = (event) => {
    this.isSnakeOnFood();
    this.snake.navigate(event?.keyCode);
    this.canvas.draw(this.snake.body, this.food);
  };

  setUpGameLoop = () => {
    //sets an interval to render 20 frames per second.
    this.interval = setInterval(this.gameLoop, 1000 / 5);
  };

  startGame = () => {
    this.setUpGameLoop();
  };

  togglePause = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    } else {
      this.interval = setInterval(this.gameLoop, 1000 / 5);
    }
  };

  endGame = () => {
    clearInterval(this.interval);
    this.canvas.drawGameOverScreen();
    this.canvas = this.snake = null;
  };

  isGameOver = () => {
    if (this.snake) {
      const hitItsTail = this.snake.body.some((b, i) => i != this.snake.body.length - 1 && b.Xpos == this.snake.head.Xpos && b.Ypos == this.snake.head.Ypos);
      const ranIntoWall =
        this.snake.head.Xpos < 0 || this.snake.head.Xpos > this.canvas.width - this.snake.scaleSize || this.snake.head.Ypos < 0 || this.snake.head.Ypos > this.canvas.height - this.snake.scaleSize;
      return ranIntoWall || hitItsTail;
    }
    return false;
  };

  isSnakeOnFood = () => {
    if (this.snake.head.Xpos === this.food.x && this.snake.head.Ypos === this.food.y) {
      this.snake.eat(this.food.x, this.food.y);
      document.getElementById("score").innerHTML = this.snake.body.length - 1;
      this.food = new Food(this.gameContext);
    }
  };
}

new Game();
