export class gameCanvas {
  canvasElement;
  ctx;

  width;
  height;
  foodSize;
  cellSize;

  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.ctx = canvasElement.getContext("2d");

    this.width = Math.floor(window.screen.width / 1.5);
    this.height = Math.floor(window.screen.height / 1.5);
    this.width = this.width - (this.width % 20);
    this.height = this.height - (this.height % 20);

    this.cellSize = 20;
    this.foodSize = 5;

    this.canvasElement.setAttribute("width", this.width);
    this.canvasElement.setAttribute("height", this.height);
    this.canvasElement.style.boxShadow = "0px 0px 5px 5px green";
  }

  drawGrid() {
    const rows = this.height / this.cellSize;
    const cols = this.width / this.cellSize;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.ctx.fillStyle = "#01060c";
        this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.beginPath();
        this.ctx.lineWidth = "6";
        this.ctx.strokeStyle = "black";
        this.ctx.rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.stroke();
      }
    }
  }

  drawSnake(body) {
    for (let i = 0; i < body.length; i++) {
      this.ctx.fillStyle = i == body.length - 1 ? "yellow" : "white";
      this.ctx.fillRect(body[i].Xpos, body[i].Ypos, this.cellSize, this.cellSize);
      this.ctx.beginPath();
      this.ctx.lineWidth = "6";
      this.ctx.strokeStyle = "black";
      this.ctx.rect(body[i].Xpos, body[i].Ypos, this.cellSize, this.cellSize);
      this.ctx.stroke();
    }
  }

  drawFood(foodX, foodY) {
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "red";

    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.ellipse(foodX + 10, foodY + 10, this.foodSize, this.foodSize, 0, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = "";

    this.foodSize = this.foodSize == 5 ? 6 : 5;
  }

  draw(snakeBody, food) {
    this.clearCanvas();
    this.drawGrid();
    this.drawFood(food.x, food.y);
    this.drawSnake(snakeBody);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGameOverScreen() {
    this.clearCanvas();
    this.ctx.font = "50px Comic Sans MS";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over, Try again!", this.width / 2, this.height / 2);
    this.canvasElement.style.boxShadow = "0px 0px 5px 5px red";
  }
}
