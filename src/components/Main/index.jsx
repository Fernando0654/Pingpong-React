import React, { useEffect, useRef, useState } from 'react';
import MainTheme from "../../assets/audio/main.mp3";

const Start = ({start}) => {
    const firstTap = useRef(null)
    const menu = useRef(null);
    let mainTheme = new Audio(MainTheme);

    function startGame(e) {
        e.preventDefault();
        if (e.target[0].value === "") {
            console.warn("You need a name");
            return;
        }
        localStorage.setItem("userName", e.target[0].value);
        menu.current.style.display = "none";
        start(e.target[0].value);
    }
    function startApp() {
        firstTap.current.style.display = "none";
        //mainTheme.play();
    }
    return (
        <div className="start" ref={menu}>
            <div className="before-start" ref={firstTap}>
                <div className="wrapper-before">
                    <a href="#" onClick={startApp}><span>ENTER THE GAME</span></a>
                </div>
            </div>
            <a href="#">Scores</a>
            <div className="wrapper">
                <span>P</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>-</span>
                <span>P</span>
                <span>O</span>
                <span>N</span>
                <span>G</span>
            </div>
            <form onSubmit={startGame}>
                <input type="text" name="user" placeholder="YOUR NAME" />
                <div className="button">
                    <button type="submit">START</button>
                </div>
            </form>
            <h2>Made by FernandoFeN</h2>
        </div>
    )
}

export default Start;
