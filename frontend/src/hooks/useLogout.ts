import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../utils/token';
import { useToast } from '../contexts/ToastContext';
import { queryClient } from '../config/queryClient';

export const useLogout = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: async () => {
            // Clear tokens
            clearTokens();
            // Clear all queries
            queryClient.clear();
        },
        onSuccess: () => {
            addToast('Logged out successfully', 'info');
            navigate('/login');
        },
    });
};
