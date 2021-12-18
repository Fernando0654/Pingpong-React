import React, { useEffect, useState } from 'react';
import { AiOutlineNotification } from "react-icons/ai";

const Toast = ({ toast }) => {
    const [Toasts, setToasts] = useState([toast]);
    const [RemovingId, setRemovingId] = useState("");
    const [FirstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (RemovingId) {
            setToasts(item => item.filter(_item => _item.id !== RemovingId))
        }

    }, [RemovingId]);

    useEffect(() => {
        if (Toasts.length && toast !== null) {
            console.log(toast.id)
            const id = Toasts[Toasts.length - 1].id;
            setTimeout(() => {
                setRemovingId(id);
            }, 6000);
        }
    }, [Toasts]);

    useEffect(() => {
        if (FirstTime) {
            setFirstTime(false);
            return;
        };
        setToasts([...Toasts, toast]);
    }, [toast]);
    return (
        <>
            <div className="notification">
                {
                    Toasts.map((item, id) => (
                        <div className="toast"
                            key={id}
                            style={id === 0 ? { display: 'none' } : { display: 'flex'}}>
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