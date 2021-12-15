import React, { useRef, useState, useEffect } from 'react';
import Ball from "./ball";
import Paddle from "./paddle";
import GameOver from "../../assets/audio/lost.mp3";
let lastTime;

const index = () => {
    const ballElement = useRef(null);
    const playerPaddleElement = useRef(null);
    const computerPaddleElement = useRef(null);
    let ball;
    let playerPaddle;
    let computerPaddle;
    let playerScore = 0;
    let computerScore = 0;
    useEffect(() => {
        ball = new Ball(ballElement.current);
        playerPaddle = new Paddle(playerPaddleElement.current);
        computerPaddle = new Paddle(computerPaddleElement.current);
        window.requestAnimationFrame(update);
    }, [])

    function update(time) {
        if (lastTime != undefined) {
            const delta = time - lastTime;
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            if (gameOver()) {
                let audioL = new Audio(GameOver);
                audioL.muted = false;
                audioL.play();
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
            document.getElementById('player-score').innerText = "Fernando " + playerScore;
        } else {
            computerScore++;
            document.getElementById('computer-score').innerText = computerScore + " Computer";
        }
        ball.reset();
        computerPaddle.reset();
        higherScore(playerScore, computerScore);
    }

    function higherScore(scoreP, scoreC) {
        if (scoreP > scoreC) {
            document.getElementById('player-score').style.color = "rgb(255, 145, 0)";
            document.getElementById('computer-score').style.color = "hsl(200, 50%, 75%)";
        } else {
            document.getElementById('computer-score').style.color = "rgb(255, 145, 0)";
            document.getElementById('player-score').style.color = "hsl(200, 50%, 75%)";
        }
    }

    document.addEventListener('mousemove', (e) => {
        playerPaddle.position = (e.y / window.innerHeight * 100) + 5;
    });


    return (
        <div>
            <div className="play">Pause ||</div>
            <div className="division"></div>
            <div className="score">
                <div id="player-score">Ferando 0</div>
                <div id="computer-score">0 Computer</div>
            </div>
            <div className="ball" ref={ballElement}></div>
            <div className="paddle left" ref={playerPaddleElement}></div>
            <div className="paddle right" ref={computerPaddleElement}></div>
        </div >
    )
}

export default index;
