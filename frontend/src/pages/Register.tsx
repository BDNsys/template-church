import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';
import { useRegister } from '../hooks/auth/useAuth';
import { validateUsername, validatePassword, checkPasswordStrength } from '../utils/validation';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string; confirmPassword?: string }>({});

    const registerMutation = useRegister();
    const passwordStrength = checkPasswordStrength(password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const usernameValidation = validateUsername(username);
        const passwordValidation = validatePassword(password);

        const newErrors: typeof errors = {};

        if (!usernameValidation.isValid) {
            newErrors.username = usernameValidation.error;
        }

        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        registerMutation.mutate({ username, password });
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join us and start your journey"
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

                <div>
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        fullWidth
                        icon={<span>🔒</span>}
                    />
                    {password && (
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full transition-all duration-300 ease-out"
                                    style={{
                                        width: `${(passwordStrength.score / 4) * 100}%`,
                                        backgroundColor: passwordStrength.color,
                                    }}
                                ></div>
                            </div>
                            <span className="text-xs font-semibold" style={{ color: passwordStrength.color }}>
                                {passwordStrength.label}
                            </span>
                        </div>
                    )}
                </div>

                <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    fullWidth
                    icon={<span>🔒</span>}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={registerMutation.isPending}
                >
                    Create Account
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
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign in
                        </Link>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
