import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-900 opacity-10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-pink-600 opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
