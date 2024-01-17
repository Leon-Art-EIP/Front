import React from 'react';

export interface BadgeProps {
    text: string;
    color?: 'danger' | 'success' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
    let badgeColor: string = "bg-gray-200 text-purple-800"

    if (color === 'danger')
        badgeColor = 'bg-red-600 text-white';
    else if (color === 'success')
        badgeColor = 'bg-gray-200 text-purple-800';
    else if (color === 'info')
        badgeColor = 'bg-purple-800 text-white';

    return (
        <span className={`inline-block py-3 px-5 rounded-full text-sm font-semibold ${badgeColor}`}>
            {text}
        </span>
    );
};

export default Badge;
