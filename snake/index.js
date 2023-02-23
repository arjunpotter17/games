import {SNAKE_SPEED, updatesnake as updateSnake, draw as drawSnake, snakeIntersection, getSnakeHead} from './snake.js'
import {updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let gameBoard = document.getElementById('game-board')
let lastTime;
let gameOver = false;

function updategame(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML= ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function update(time){

    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
          window.location = './'
        }
        else{
            window.location = '../index.html'
        }
        return
    }

    window.requestAnimationFrame(update)
    const deltaSeconds=(time-lastTime)/1000;
    if(deltaSeconds<1/SNAKE_SPEED) return

    //console.log('Render')
    lastTime=time;
    updategame()
    draw()
}

window.requestAnimationFrame(update)






