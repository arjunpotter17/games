
import {onSnake, expandSnake} from './snake.js'
import { randomGridPos } from './grid.js';

let foodpos = getRandomFoodpos()
let EXPANSION_RATE=1;

export function updateFood(){

        if(onSnake(foodpos))
        {
                expandSnake(EXPANSION_RATE)
                foodpos = getRandomFoodpos()
        }
        
}

export function draw(gameBoard){
    
        const foodElem = document.createElement('div')
        foodElem.style.gridRowStart = foodpos.y;
        foodElem.style.gridColumnStart = foodpos.x;
        foodElem.classList.add('food')
        gameBoard.appendChild(foodElem);
}

function getRandomFoodpos(){
        let newFoodPos
        while(newFoodPos==null || onSnake(newFoodPos)){
                newFoodPos = randomGridPos()
        }
        return newFoodPos;
}