import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api from "../../api";

export const useAuth = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        try {
            const decoded = jwtDecode<{ exp?: number }>(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration && tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthorized(false);
        }
    };

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
            setIsAuthorized(false);
            return;
        }
        try {
            const res = await api.post("/users/token/refresh/", {
                refresh: refresh,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            setIsAuthorized(false);
        }
    };

    useEffect(() => {
        auth();

        // Listener for storage changes (e.g. from other tabs or manual changes)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === ACCESS_TOKEN || e.key === REFRESH_TOKEN) {
                auth();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return isAuthorized;
};
