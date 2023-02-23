const HOLE_HEIGHT = 180;
const PIPE_WIDTH = 80;
let pipes=[];
let timeSinceLastPipe;
let PIPE_INTERVAL=1500;
let PIPE_SPEED = 0.75;
let passedpipes

export function updatepipes(delta){
    timeSinceLastPipe+=delta;
    if(timeSinceLastPipe>PIPE_INTERVAL){
        timeSinceLastPipe-=PIPE_INTERVAL;
        createPipe()
    }

    pipes.forEach(pipe=>{
        if(pipe.left+ PIPE_WIDTH <0){
            passedpipes+=1;
            return pipe.remove()
        }
        pipe.left=pipe.left - delta* PIPE_SPEED;
    })

}

export function setpipes(){
    document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH)
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)
    pipes.forEach(pipe=>pipe.remove())
    timeSinceLastPipe =0;
    passedpipes=0;
}

function createPipe(){
    const pipeelem=document.createElement('div');
    const topelem=createPipeSegment('top');
    const bottomelem= createPipeSegment('bottom')
    pipeelem.append(topelem);
    pipeelem.append(bottomelem);
    pipeelem.classList.add('pipe');
    pipeelem.style.setProperty('--hole-top', randomnumberbetween(HOLE_HEIGHT*1.5, window.innerHeight-HOLE_HEIGHT*0.5))
    const pipe={
        get left(){
            return parseFloat(getComputedStyle(pipeelem).getPropertyValue('--pipe-left'))
        },

        set left(value){pipeelem.style.setProperty('--pipe-left',value)},

        remove(){
            pipes = pipes.filter(p=>p!=pipe)
            pipeelem.remove();
        },

        rects(){
            return[
                topelem.getBoundingClientRect(),
                bottomelem.getBoundingClientRect(),
            ]
        }
    }

    

    pipe.left = window.innerWidth;
    document.body.append(pipeelem);
    pipes.push(pipe)
}

export function getPipeRects(){
    return pipes.flatMap(pipe=>pipe.rects())
}

export function getpassedpipes()
{
    return passedpipes;
}

function createPipeSegment(position){
    const segment=document.createElement('div')
    segment.classList.add('segment',position);
    return segment;
}

function randomnumberbetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}