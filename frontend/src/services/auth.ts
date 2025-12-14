import api from '../api';
import type { LoginCredentials, RegisterCredentials, AuthTokens, User } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/api/users/token/', credentials);
    return response.data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<void> => {
    await api.post('/api/users/register/', credentials);
};

export const refreshToken = async (refresh: string): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/api/users/token/refresh/', { refresh });
    return response.data;
};

// Note: This would require a backend endpoint to fetch user details
// For now, we'll decode from token, but in production you might want a /api/users/me/ endpoint
export const getCurrentUser = async (): Promise<User> => {
    // This is a placeholder - you might want to implement a proper endpoint
    // For now, we'll get user data from the token in the hook
    const response = await api.get<User>('/api/users/me/');
    return response.data;
};
