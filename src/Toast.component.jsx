import React, { useEffect, useState } from 'react';
import { AiOutlineNotification } from "react-icons/ai";

const Toast = ({ toast }) => {
    const [Toast, setToast] = useState([]);
    useEffect(() => {
        setToast([...Toast, toast]);
    }, [toast]);

    return (
        <>
            toast ?
            <div className="notification">
                {
                    Toast.map((item, id) => (
                        <div className="toast"
                            key={id}
                            style={id === 0 ? { display: 'none' } : { display: 'flex' }}>
                            <div className="icon">
                                <AiOutlineNotification />
                            </div>
                            <div className="body-notification">
                                <h1>{item.title}</h1>
                                <span>{item.message}</span>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default Toast;

{/* 

*/}