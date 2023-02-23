const SPEED=.008;

export default class Paddle{
    constructor(paddleelem)
    {
        this.paddleelem=paddleelem;
        this.reset()
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleelem).getPropertyValue('--position'));
    }

    set position(value){
        this.paddleelem.style.setProperty('--position',value)
    }

    update(delta, ballHeight){
        this.position+= SPEED*delta*(ballHeight-this.position);

    }

    rect(){
        return this.paddleelem.getBoundingClientRect()
    }

    reset(){
        this.position=50
    }
}