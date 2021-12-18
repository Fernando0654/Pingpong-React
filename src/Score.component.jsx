import React, { useEffect, useState } from 'react'

const Score = ({ winner, user }) => {
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
    }, [winner]);
    const greater = { color: 'red' };
    const smaller = { color: 'white' };
    return (
        <>
            <div className="division"></div>
            <div className="score">
                <div id="player-score"
                    style={
                        playerScore > computerScore ?
                            greater : smaller}
                >
                    {user} {playerScore}
                </div>
                <div id="computer-score"
                    style={
                        computerScore > playerScore ?
                            greater : smaller}
                >
                    {computerScore} CPU
                </div>
            </div>
        </>
    )
}

export default Score
