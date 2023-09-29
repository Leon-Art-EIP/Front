import React from 'react';

export interface BadgeProps {
    text: string;
    color?: 'danger' | 'success' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
    let badgeColor: string;

    switch(color) {
        case 'danger':
            badgeColor = 'bg-red-600 text-white';
            break;
        case 'success':
            badgeColor = 'bg-gray-200 text-purple-800';
            break;
        case 'info':
            badgeColor = 'bg-purple-800 text-white';
            break;
        default:
            badgeColor = '';
    }

    return (
        <span className={`inline-block py-3 px-5 rounded-full text-sm font-semibold ${badgeColor}`}>
            {text}
        </span>
    );
};

export default Badge;
