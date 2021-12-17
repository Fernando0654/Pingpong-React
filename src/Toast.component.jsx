import React from 'react';
import { AiOutlineNotification } from "react-icons/ai";

const Toast = ({ toast }) => {
    console.log(toast)

    return (
        <>
            <div className="notification">
                <div className="icon">
                    <AiOutlineNotification />
                </div>
                <svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <div className="body-notification">
                    <h1>{toast.title}</h1>
                    <span>{toast.message}</span>
                </div>
            </div>
        </>
    )
}

export default Toast
