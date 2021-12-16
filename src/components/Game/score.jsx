import React, { useEffect, useState } from 'react'

const Score = ({playerScore}) => {


    return (
        <div className="score">
            <div id="player-score"> {playerScore}</div>
            <div id="computer-score">0 Computer</div>
        </div>
    )
}

export default Score
