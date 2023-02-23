const birdelem=document.querySelector('[data-bird]');
const BIRD_SPEED=0.5;
const JUMP_DURATION=100;
let timeSinceLastJump=Number.POSITIVE_INFINITY;



export function setbird(){
    setTop(window.innerHeight/2);
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

export function updatebird(delta) {
    if(timeSinceLastJump < JUMP_DURATION)
        setTop(getTop() - BIRD_SPEED*delta);
    else
        setTop(getTop() + BIRD_SPEED*delta);

    timeSinceLastJump+=delta;
}

export function getBirdRect(){
    return birdelem.getBoundingClientRect();
}

function setTop(value){
    birdelem.style.setProperty('--bird-top', value)
}

function handleJump(e){
    if(e.code!=='Space')return
        
    else
    timeSinceLastJump=0;
}

function getTop(){
    return parseFloat(getComputedStyle(birdelem).getPropertyValue('--bird-top'))
}