import React, { useState, useEffect } from 'react';

export interface NotificationToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, type }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const closeToast = () => {
        setVisible(false);
    };

    let borderColor;
    switch(type) {
        case 'success':
            borderColor = 'border-green-500';
            break;
        case 'error':
            borderColor = 'border-red-500';
            break;
        case 'info':
            borderColor = 'border-blue-500';
            break;
    }

    return (
        visible ?
        <div className={`fixed right-0 top-0 m-6 p-4 border-2 ${borderColor} rounded-md bg-white shadow-lg z-50`}>
            <button id="close-toast" className="float-right" onClick={closeToast}>X</button>
            <p>{message}</p>
        </div>
        : null
    );
};

export default NotificationToast;
