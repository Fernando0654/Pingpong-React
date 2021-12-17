import React, { useEffect, useState } from 'react';
// Components
import MenuComponent from "./Main.component";
import GameComponent from './Game.component';
import OptionsComponent from "./Options.component";
import ScoreComponent from "./Score.component";
import Toast from "./Toast.component";
// Styles
import "./sass/index.scss";

const App = () => {
    const [User, setUser] = useState("User");
    const [Pause, setPause] = useState(true);
    const [EndGame, setEndGame] = useState(true);
    const [Score, setScore] = useState({ winner: 'user', score: 0 });
    const [ModeGame, setModeGame] = useState(false); // if true 'onkeydown', else 'onmousemove'
    const [NewToast, setNewToast] = useState({ title: 'Titulo', message: 'Mensaje' })

    useEffect(() => {
        return (e) => {
            setScore({ 'winner': 'user', 'score': 0 });
        }
    }, [Pause, EndGame, Score.winner, ModeGame]);

    const start = (user) => (setPause(!Pause), setUser(user));
    const pause = () => setPause(!Pause);
    const end = () => setEndGame(!EndGame);
    const updateScore = (winnerScore) => setScore(winnerScore);
    const restart = () => {
        document.querySelector('.start').style.display = "flex";
        setPause(true);
        setScore({ 'winner': 'user', 'score': 0 });
    }
    const changeModeGame = (mode) => (setModeGame(mode));
    const newToast = (title, message) => setNewToast({ title: title, message: message });
    return (
        <>
            <MenuComponent start={start} />
            <OptionsComponent
                pauseState={Pause}
                pause={pause}
                end={end}
                mode={changeModeGame}
                toast={newToast}
            />
            <ScoreComponent winner={Score} user={User} />
            <GameComponent
                pauseState={Pause}
                endState={EndGame}
                restart={restart}
                updateScore={updateScore}
                modeGame={ModeGame}
            />
            <Toast toast={NewToast} />
        </>
    )
}

export default App;
