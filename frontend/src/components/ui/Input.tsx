import React, { type InputHTMLAttributes, useState } from 'react';
import './Input.css';

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
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== '' && props.value !== undefined;

    return (
        <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''} ${className}`}>
            <div className={`input-container ${isFocused || hasValue ? 'input-container--active' : ''} ${error ? 'input-container--error' : ''}`}>
                {icon && <div className="input__icon">{icon}</div>}
                <input
                    className="input"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {label && (
                    <label className={`input__label ${isFocused || hasValue ? 'input__label--floating' : ''}`}>
                        {label}
                    </label>
                )}
            </div>
            {error && <span className="input__error">{error}</span>}
        </div>
    );
};

export default Input;
