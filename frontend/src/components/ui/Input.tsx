import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <div className="relative rounded-md shadow-sm">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    className={`
                        block w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3
                        ${icon ? 'pl-10' : 'pl-3'}
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                    {...props}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
