import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/auth';
import { setTokens } from '../../utils/token';
import { useToast } from '../../contexts/ToastContext';
import type { LoginCredentials, RegisterCredentials } from '../../types';


/*
  data = {
        "username": user.username,
        "email": user.email,
        "phone_number": getattr(user, 'phone_number', None), # Safely get if field exists
        "is_approved_member": getattr(user, 'is_approved_member', False),
        "is_global_auditor": getattr(user, 'is_global_auditor', False),
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "is_leadership": is_leadership
    } */

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

