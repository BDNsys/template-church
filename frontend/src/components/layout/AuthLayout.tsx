import React from 'react';
import './AuthLayout.css';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__background">
                <div className="auth-layout__gradient auth-layout__gradient--1"></div>
                <div className="auth-layout__gradient auth-layout__gradient--2"></div>
                <div className="auth-layout__gradient auth-layout__gradient--3"></div>
            </div>

            <div className="auth-layout__content">
                <div className="auth-layout__header">
                    <h1 className="auth-layout__title text-gradient">{title}</h1>
                    {subtitle && <p className="auth-layout__subtitle">{subtitle}</p>}
                </div>

                <div className="auth-layout__form">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
