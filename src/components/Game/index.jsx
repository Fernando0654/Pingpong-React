import React, { useRef, useState, useEffect } from 'react';
import Ball from "./ball";
import Paddle from "./paddle";
let lastTime;

const index = () => {
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
        //window.requestAnimationFrame(update);
    }, [])

    function update(time) {
        if (lastTime != undefined) {
            const delta = time - lastTime;
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
        }
        lastTime = time;
        window.requestAnimationFrame(update);
    }

    document.addEventListener('mousemove', (e) => {
        playerPaddle.position = (e.y / window.innerHeight * 100) + 5;
    });

    return (
        <div>
            <div className="score">
                <div id="player-score">0</div>
                <div id="computer-score">0</div>
            </div>
            <div className="ball" ref={ballElement}></div>
            <div className="paddle left" ref={computerPaddleElement}></div>
            <div className="paddle right" ref={playerPaddleElement}></div>
        </div>
    )
}

export default index;
