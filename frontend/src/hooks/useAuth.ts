import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/auth';
import { setTokens } from '../utils/token';
import { useToast } from '../contexts/ToastContext';
import type { LoginCredentials, RegisterCredentials } from '../types';

export const useLogin = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
        onSuccess: (data) => {
            setTokens(data.access, data.refresh);
            addToast('Login successful! Welcome back.', 'success');
            navigate('/');
        },
        onError: (error: any) => {
            const message = error.response?.data?.detail || 'Login failed. Please check your credentials.';
            addToast(message, 'error');
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
        onSuccess: () => {
            addToast('Registration successful! Please login.', 'success');
            navigate('/login');
        },
        onError: (error: any) => {
            const message = error.response?.data?.detail ||
                error.response?.data?.username?.[0] ||
                'Registration failed. Please try again.';
            addToast(message, 'error');
        },
    });
};
