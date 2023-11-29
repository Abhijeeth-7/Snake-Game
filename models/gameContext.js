export class GameContext{
    canvasWidth;
    canvasHeight;
    cellSize;
    snakeBody;
    food;

    constructor(args){
        this.canvasHeight = args?.height;
        this.canvasWidth = args?.width;
        this.snakeBody = args?.snakeBody;
        this.food = args?.food;
    }
}