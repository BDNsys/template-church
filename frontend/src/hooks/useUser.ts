import { useQuery } from '@tanstack/react-query';
import { getUserFromToken } from '../utils/token';
import type { User } from '../types';

export const useUser = () => {
    return useQuery<User | null>({
        queryKey: ['user'],
        queryFn: () => {
            // Get user from token
            // In a production app, you might want to fetch from /api/users/me/
            const userData = getUserFromToken();
            if (!userData) return null;

            return {
                id: userData.user_id,
                username: userData.username,
                email: userData.email,
                is_staff: userData.is_staff,
                is_superuser: userData.is_superuser,
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
