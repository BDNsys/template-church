import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';
import { useLogin } from '../hooks/useAuth';
import { validateUsername, validatePassword } from '../utils/validation';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const loginMutation = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const usernameValidation = validateUsername(username);
        const passwordValidation = validatePassword(password);

        if (!usernameValidation.isValid || !passwordValidation.isValid) {
            setErrors({
                username: usernameValidation.error,
                password: passwordValidation.error,
            });
            return;
        }

        setErrors({});
        loginMutation.mutate({ username, password });
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue to your account"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username}
                    fullWidth
                    icon={<span>👤</span>}
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    fullWidth
                    icon={<span>🔒</span>}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={loginMutation.isPending}
                >
                    Sign In
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">
                            OR
                        </span>
                    </div>
                </div>

                <GoogleLoginButton fullWidth size="lg" />

                <div className="text-center mt-4">
                    <span className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign up
                        </Link>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
