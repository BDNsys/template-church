import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';


export interface Video {
    id: number;
    video: string | null;
    video1: string | null;
    active: boolean;
    group: number | null;
    create_at: string;
}

export const useVideos = () => {
    return useQuery<Video[]>({
        queryKey: ['videos'],
        queryFn: async () => {
            const { data } = await api.get('/videos/');
            return data;
        },
    });
};

export const useUploadVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/videos/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['videos'] });
        },
    });
};
