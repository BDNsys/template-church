import React, { type ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

    const variants = {
        primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500',
        outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500',
        ghost: 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm leading-4',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner size="sm" />
                    <span className="ml-2">Loading...</span>
                </>
            ) : (
                <>
                    {icon && <span className="mr-2 -ml-1 h-5 w-5">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
