import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import type { DecodedToken } from '../types';

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN);
};

export const setTokens = (access: string, refresh: string): void => {
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
};

export const clearTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

export const isTokenValid = (): boolean => {
    const token = getAccessToken();
    if (!token) return false;
    return !isTokenExpired(token);
};

export const getUserFromToken = (): DecodedToken | null => {
    const token = getAccessToken();
    if (!token) return null;
    return decodeToken(token);
};
