import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient';
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default',
    hover = false,
}) => {
    return (
        <div className={`card card--${variant} ${hover ? 'card--hover' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
