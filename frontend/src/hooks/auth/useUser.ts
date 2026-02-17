import { useQuery } from '@tanstack/react-query';
// import { getUserFromToken } from '../../utils/token';
// import { getUserFromToken } from '../../utils/token';
import type { User } from '../../types';
import api from '../../api';

// export const useUser = () => {
//     return useQuery<User | null>({
//         queryKey: ['user'],
//         queryFn: () => {
//             // Get user from token
//             // In a production app, you might want to fetch from /users/me/
//             // const userData = getUserFromToken();
//             const userData=useGetUserInfo();
//             if (!userData) return null;


//             return userData;
//         },
//         staleTime: 1000 * 60 * 5, // 5 minutes
//     });
// };



export const useUser = () => {
    return useQuery<User>({
        queryKey: ['user-info'],
        queryFn: async () => {
            const { data } = await api.get('/users/user-info/');
            return data;
        },
    });

}
