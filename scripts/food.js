export class Food{
    x;
    y;

    gameCtx;

    constructor(gameCtx){
        this.gameCtx = gameCtx;
        this.spanFood();
    }
    
    spanFood(){
        do{
            const row = Math.floor(Math.random()*100)%100;
            const col = Math.floor(Math.random()*100)%100;
            
            this.x = (col * this.gameCtx.cellSize)%this.gameCtx.canvasWidth;
            this.y = (row * this.gameCtx.cellSize)%this.gameCtx.canvasHeight;
        } while(this.isFoodSpannedOnSnake(this.gameCtx.snakeBody));
    }

    isFoodSpannedOnSnake(snakeBody){
        return snakeBody.some(b => b.Xpos == this.x && b.Ypos == this.y);
    }
}