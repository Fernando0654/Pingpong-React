import React, { useRef, useEffect } from 'react';
// Objects
import Ball from "./Objects/ball";
import Paddle from "./Objects/paddle";
// Audio
import GameOver from "./assets/audio/lost.mp3";

let lastTime;
let pause = true;

const GameComponent = ({ pauseState, endState, updateScore, restart }) => {
    pause = pauseState;
    const ballElement = useRef(null);
    const playerPaddleElement = useRef(null);
    const computerPaddleElement = useRef(null);
    let ball;
    let playerPaddle;
    let computerPaddle;
    useEffect(() => {
        ball = new Ball(ballElement.current);
        playerPaddle = new Paddle(playerPaddleElement.current);
        computerPaddle = new Paddle(computerPaddleElement.current);
        document.onkeydown = directional;
        window.requestAnimationFrame(update);
        return () => {
            restart();
            console.log("finish game")
        }
    }, [endState]);
    function update(time) {
        if (lastTime != undefined) {
            let delta;
            if (pause) {
                delta = 0;
            } else {
                delta = time - lastTime;
            }
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            if (gameOver()) {
                let audioL = new Audio(GameOver);
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
        ball.reset();
        computerPaddle.reset();
        if (rect.right > window.innerWidth) {
            updateScore({ 'winner': 'player', 'score': 1 });
        } else {
            updateScore({ 'winner': 'computer', 'score': 1 });
        }
        ball.reset();
        computerPaddle.reset();
    }

    // document.addEventListener('mousemove', (e) => {
    //     playerPaddle.position = (e.y / window.innerHeight * 100) + 5;
    // });

    function directional(e) {
        e = e || window.event;
        let paddle = document.querySelector('.left');
        let positionPaddle = parseFloat(getComputedStyle(paddle).getPropertyValue("--position"));
        let limit = positionPaddle / window.innerHeight * 100;
        if (limit < 0.90) {
            playerPaddle.position = 6;
            return;
        }
        if (limit > 14.29) {
            playerPaddle.position = 93;
            return;
        }
        if (e.keyCode == '38') {
            // up arrow
            positionPaddle -= 2;
            playerPaddle.position = positionPaddle;
        }
        else if (e.keyCode == '40') {
            // down arrow
            positionPaddle += 2;
            playerPaddle.position = positionPaddle;
        }
    }

    return (
        <>
            <div className="ball" ref={ballElement}></div>
            <div className="paddle left" ref={playerPaddleElement}></div>
            <div className="paddle right" ref={computerPaddleElement}></div>
        </>
    )
}

export default GameComponent;
