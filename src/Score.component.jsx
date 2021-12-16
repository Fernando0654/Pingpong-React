import React, { useEffect, useState } from 'react'

const Score = ({ winner }) => {
    const [playerScore, setplayerScore] = useState(0);
    const [computerScore, setcomputerScore] = useState(0);
    useEffect(() => {
        return () => {
            if (winner.winner === "player") {
                setplayerScore(playerScore + winner.score);
            }
            if (winner.winner === "computer") {
                setcomputerScore(computerScore + winner.score);
            }
        }
    }, [winner.winner])
    return (
        <>
            <div className="division"></div>
            <div className="score">
                <div id="player-score">asdsadsa {playerScore}</div>
                <div id="computer-score">{computerScore} CPU</div>
            </div>
        </>
    )
}

export default Score
