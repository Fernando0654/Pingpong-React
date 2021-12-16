import React, { useEffect, useState } from 'react';
// Components
import MenuComponent from "./Main.component";
import GameComponent from './Game.component';
import OptionsComponent from "./Options.component";
import ScoreComponent from "./Score.component";
// Styles
import "./sass/index.scss";

const App = () => {
    const [Pause, setPause] = useState(true);
    const [EndGame, setEndGame] = useState(false);
    const [Score, setScore] = useState({ 'winner': 'user', 'score': 0 });

    useEffect(() => {
        return () => {
            setScore({ 'winner': 'user', 'score': 0 });
        }
    }, [Pause, EndGame, Score.winner]);

    const start = () => (setPause(!Pause));
    const pause = () => setPause(!Pause);
    const end = () => setEndGame(!EndGame);
    const updateScore = (winnerScore) => setScore(winnerScore);
    const restart = () => {
        document.querySelector('.start').style.display = "flex";
        setPause(true);
        setScore({ 'winner': 'user', 'score': 0 });
    }
    return (
        <>
            <MenuComponent start={start} />
            <OptionsComponent pause={pause} end={end} />
            <ScoreComponent winner={Score} />
            <GameComponent
                pauseState={Pause}
                endState={EndGame}
                restart={restart}
                updateScore={updateScore}
            />
        </>
    )
}

export default App;
