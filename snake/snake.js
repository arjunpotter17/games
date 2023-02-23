import {getInputDirection} from './input.js';

export const SNAKE_SPEED=5;
const snakeBody=[{x:11, y:11}]
let newSegments=0;

export function updatesnake(){

    addSegments()
    const input= getInputDirection()
    for(let i=snakeBody.length-2; i>=0; i--)
    {
        snakeBody[i+1] = {...snakeBody[i]}
    }

    snakeBody[0].x +=input.x;
    snakeBody[0].y +=input.y;
}

export function getSnakeHead(){
    return snakeBody[0];
}


export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
  }
  

export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElem = document.createElement('div')
        snakeElem.style.gridRowStart = segment.y;
        snakeElem.style.gridColumnStart = segment.x;
        snakeElem.classList.add('snake')
        gameBoard.appendChild(snakeElem);
    })
}

export function expandSnake(amount){
    newSegments +=amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i=0; i<newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length-1]})
    }
    newSegments=0;
}