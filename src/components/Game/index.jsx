import React, { useRef, useState, useEffect } from 'react';
// Objects
import Ball from "./ball";
import Paddle from "./paddle";
// Audio
import GameOver from "../../assets/audio/lost.mp3";
// Components
import Menu from "../Main/index";
import Score from './score';
// Icons
import { MdGames, MdPause, MdOutlinePlayArrow } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";

let lastTime;
let pause = true;

const index = () => {
    const [endGame, setendGame] = useState(false);
    const score = useRef(null);
    const ballElement = useRef(null);
    const playerPaddleElement = useRef(null);
    const computerPaddleElement = useRef(null);
    let playerScore = 0;
    let computerScore = 0;
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
        }
    }, [endGame]);
    function update(time) {
        if (lastTime != undefined) {
            let delta;
            if (pause) {
                delta = 0;
            } else {
                delta = time - lastTime;
            }
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, 0);
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
        playerScore++;
        ball.reset();
        computerPaddle.reset();
        if (rect.right >= window.innerWidth) {
            playerScore++;
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

    const start = (user) => (
        pause = !pause,
        document.getElementById('player-score').innerText += " " + user);

    function restart() {
        document.querySelector('.start').style.display = "flex";
        pause = true;
        playerScore = 0;
        computerScore = 0;
        document.getElementById('player-score').innerText = playerScore;
        document.getElementById('computer-score').innerText = computerScore + " Computer";
        document.getElementById('player-score').style.color = "white";
        document.getElementById('computer-score').style.color = "white";
    }

    return (
        <>
            <Menu start={start} />
            <div className="options">
                <button>
                    <MdGames />
                </button>
                <button onClick={() => pause = !pause}>
                    <MdPause />
                </button>
                <button onClick={() => setendGame(!endGame)}>
                    <AiOutlinePoweroff />
                </button>
            </div>
            <div className="division"></div>
            <Score update={playerScore} />
            <div className="ball" ref={ballElement}></div>
            <div className="paddle left" ref={playerPaddleElement}></div>
            <div className="paddle right" ref={computerPaddleElement}></div>
        </>
    )
}

export default index;
