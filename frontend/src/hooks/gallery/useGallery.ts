import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';



export interface GalleryImage {
    id: number;
    title: string;
    image: string;
    active: boolean;
    group: number | null;
    create_at: string;
}






export const useGallery = () => {
    return useQuery<GalleryImage[]>({
        queryKey: ['gallery'],
        queryFn: async () => {
            const { data } = await api.get('/api/gallery/');
            return data;
        },
    });
};






export const useUploadGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/gallery/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};
