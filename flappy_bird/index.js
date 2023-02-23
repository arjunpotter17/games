import {updatebird, setbird, getBirdRect} from './bird.js';
import {updatepipes, setpipes, getpassedpipes, getPipeRects} from './pipe.js'
document.addEventListener('keypress',handleStart, {once:true})
const title=document.querySelector('[data-title]')
const subtitle=document.querySelector('[data-subtitle]')
let lastTime,gameover;

function updateLoop(time)
{
    if (gameover) {
        if (confirm('You Lost! Try againg?')) {
          window.location = './'
        }
        else {
          window.location = '../index.html'
        }
        return
    }

    if(lastTime!=null)
    {
        const delta=time-lastTime;
        updatebird(delta);
        updatepipes(delta)
        if(checkLose()) return handleLose();
    }
    lastTime=time;
    
    window.requestAnimationFrame(updateLoop)
}

function handleStart(){
    title.classList.add('hide')
    setbird();
    setpipes()
    lastTime=null;
    window.requestAnimationFrame(updateLoop)
}

function isCollision(rect1, rect2){
    return(
        rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    )
}


function checkLose(){
    const birdrect=getBirdRect();
    console.log(birdrect.left)
    const insidePipe = getPipeRects().some(i=>isCollision(i,birdrect))
    console.log(insidePipe)
    if(birdrect.top<0 || birdrect.bottom>window.innerHeight || insidePipe)
        return true;
}

function handleLose(){
    
    setTimeout(()=>{
        title.classList.remove('hide'); 
        title.textContent = ''
    subtitle.classList.remove('hide');
    subtitle.textContent=`${getpassedpipes()} pipes`
    document.addEventListener('keypress',handleStart, {once:true})
    gameover = true;
    }, 100)
    
}   