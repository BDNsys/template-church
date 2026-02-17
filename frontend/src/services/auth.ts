import api from '../api';
import type { LoginCredentials, RegisterCredentials, AuthTokens, User } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/users/token/', credentials);
    return response.data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<void> => {
    await api.post('/users/register/', credentials);
};

export const refreshToken = async (refresh: string): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/users/token/refresh/', { refresh });
    return response.data;
};

// Note: This would require a backend endpoint to fetch user details
// For now, we'll decode from token, but in production you might want a /users/me/ endpoint
export const getCurrentUser = async (): Promise<User> => {
    // This is a placeholder - you might want to implement a proper endpoint
    // For now, we'll get user data from the token in the hook
    const response = await api.get<User>('/users/me/');
    return response.data;
};
export const verifyGoogleLogin = async (code: string, codeVerifier: string): Promise<AuthTokens> => {
    try {
        const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URL || `${window.location.origin}/auth/callback`;
        const response = await api.post<any>('/users/auth/google/verify/', {
            code,
            code_verifier: codeVerifier,
            redirect_uri: redirectUri,
        });

        console.log('Google verify response:', response.data);

        // Handle both dj-rest-auth and custom naming conventions
        const access = response.data.access || response.data.access_token;
        const refresh = response.data.refresh || response.data.refresh_token;

        if (!access || !refresh) {
            console.error('Missing tokens in response:', response.data);
            throw new Error('Invalid token response from server');
        }

        return { access, refresh };
    } catch (error) {
        console.error('Error during Google login verification:', error);
        throw error;
    }
};
