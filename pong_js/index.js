
import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById("ball"))
const Playerpaddle = new Paddle(document.getElementById('player-paddle'))
const computerpaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const title = document.getElementById('rule-heading')
let lastTime, gameover;
function update(time) {
  if (gameover) {
    if (confirm('Press ok to restart.')) {
      window.location = './'
    }
    else {
      window.location = '../index.html'
    }
    return
  }


  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [Playerpaddle.rect(), computerpaddle.rect()])
    computerpaddle.update(delta, ball.y)

    if (isLose())
      handleLose()
  }

  lastTime = time;
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.innerText = parseInt(playerScoreElem.innerText) + 1
  } else {
    computerScoreElem.innerText = parseInt(computerScoreElem.innerText) + 1
  }
  ball.reset()
  computerpaddle.reset()
  if(parseInt(playerScoreElem.innerText) == 3 || parseInt(computerScoreElem.innerText) == 3)
  {
    gameover = true;
  }
  
}




document.addEventListener('mousemove', e => {
  Playerpaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)