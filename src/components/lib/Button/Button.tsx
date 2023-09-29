import React from 'react';

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    color?: 'danger' | 'success' | 'info';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, color }) => {
    let buttonColor: string;
    let hoverColor: string;

    switch(color) {
        case 'danger':
            buttonColor = 'bg-red-600 text-white';
            hoverColor = 'hover:bg-red-700';
            break;
        case 'success':
            buttonColor = 'bg-gray-200 text-purple-800';
            hoverColor = 'hover:bg-gray-300';
            break;
        case 'info':
            buttonColor = 'bg-purple-800 text-white';
            hoverColor = 'hover:bg-purple-900';
            break;
        default:
            buttonColor = '';
            hoverColor = '';
    }

    return (
        <button 
            className={`rounded-lg py-3 px-10 text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out ${buttonColor} ${hoverColor}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
