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
        toast("Paused", message);
    }
    function setEnd() {
        end();
        message = "Well done!"
        toast("Game ended", message);
    }
    function setModeGame() {
        mode(modeGame);
        message = modeGame ? "Keyboard mode off" : "Keyboard mode on";
        toast("Game mode changed", message);
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
