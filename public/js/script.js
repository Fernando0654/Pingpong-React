import Ball from './Ball';
import Paddle from './Paddle';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

let lastTime;
let playerScore = 0;
let computerScore = 0;

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        if (gameOver()) {
            console.warn("GAME OVER!");
            handleLose();
        }
    }
    lastTime = time;

    window.requestAnimationFrame(update);
}

function gameOver() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScore++;
        // Cambiar el texto
    } else {
        computerScore++;
        // Cambiar el texto
    }
    ball.reset();
    computerPaddle.reset();

}

document.addEventListener('mousemove', (e) => {
    playerPaddle.position = e.y / window.innerHeight * 100;
})

window.requestAnimationFrame(update);