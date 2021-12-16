import React from 'react';
import { MdGames, MdPause, MdOutlinePlayArrow } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";

const Options = ({ pause, end }) => {
    function setPause() {
        pause();
    }
    function setEnd() {
        end();
    }
    return (
        <div className="options">
            <button>
                <MdGames />
            </button>
            <button onClick={setPause}>
                <MdPause />
            </button>
            <button onClick={setEnd}>
                <AiOutlinePoweroff />
            </button>
        </div>
    )
}

export default Options;
