import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useRegister } from '../hooks/useAuth';
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                flex: 1,
                                height: '4px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '2px',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: `${(passwordStrength.score / 4) * 100}%`,
                                    height: '100%',
                                    background: passwordStrength.color,
                                    transition: 'all 0.3s ease',
                                }}></div>
                            </div>
                            <span style={{ fontSize: '12px', color: passwordStrength.color, fontWeight: 600 }}>
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

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                            Sign in
                        </Link>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
