import React, { useState } from 'react';
import { MdGames, MdPause, MdOutlinePlayArrow } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiPointer } from "react-icons/bi";

const Options = ({ pauseState, pause, end, mode, toast }) => {
    const [modeGame, setGame] = useState(true);
    let message = "";
    function setPause() {
        pause();
        message = pauseState ? "Go ahead!" : "Waiting for you...";
        const title = pauseState ? "Play" : "Paused";
        toast(title, message);
    }
    function setEnd() {
        end();
        message = "See you soon :)"
        toast("Game ended", message);
    }
    function setModeGame() {
        mode(modeGame);
        message = "You can't undone this options until the game is over";
        toast("Follower mode activated", message);
        setGame(!modeGame);
    }
    return (
        <div className="options">
            <button onClick={setModeGame}>
                {
                    modeGame ? <MdGames /> : <BiPointer />
                }
            </button>
            <button onClick={setPause}>
                {
                    !pauseState ? <MdPause /> : <MdOutlinePlayArrow />
                }
            </button>
            <button onClick={setEnd}>
                <AiOutlinePoweroff />
            </button>
        </div>
    )
}

export default Options;
