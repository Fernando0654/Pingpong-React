import React, { useRef, useState, useEffect } from 'react';
import Ball from "./ball";
import Paddle from "./paddle";
import GameOver from "../../assets/audio/lost.mp3";
import Menu from "../Main/index";

let lastTime;

const index = () => {
    const [userName, setUserName] = useState(null);
    const [Pause, setPause] = useState(false);
    const ballElement = useRef(null);
    const playerPaddleElement = useRef(null);
    const computerPaddleElement = useRef(null);
    let playerScore = 0;
    let computerScore = 0;
    let pause = true;
    let ball;
    let playerPaddle;
    let computerPaddle;
    useEffect(() => {
        ball = new Ball(ballElement.current);
        playerPaddle = new Paddle(playerPaddleElement.current);
        computerPaddle = new Paddle(computerPaddleElement.current);
        document.onkeydown = directional;
        setUserName(localStorage.getItem("userName"));
        window.requestAnimationFrame(update);
    }, [Pause]);
    function update(time) {
        if (lastTime != undefined) {
            let delta;
            if (Pause) {
                delta = 0;
                console.log("PAUSE")
            } else {
                delta = time - lastTime;
                console.log("PLAY")
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
        if (rect.right >= window.innerWidth) {
            playerScore++;
            document.getElementById('player-score').innerText = { userName } + " " + playerScore;
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
            console.log("limit bottom ", limit);
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

    const changeState = () => {
        setPause(!Pause);
    }

    return (
        <>
            <Menu />
            <div className="play" style={{ zIndex: "3000" }} onClick={changeState}>Pause ||</div>
            <div className="division"></div>
            <div className="score">
                <div id="player-score">{userName} 0</div>
                <div id="computer-score">0 Computer</div>
            </div>
            <div className="ball" ref={ballElement}></div>
            <div className="paddle left" ref={playerPaddleElement}></div>
            <div className="paddle right" ref={computerPaddleElement}></div>
        </>
    )
}

export default index;
