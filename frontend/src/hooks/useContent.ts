import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

// Types
export interface Blog {
    id: number;
    title: string;
    description: string;
    text: string;
    content_type: 'blog' | 'announcement';
    is_public: boolean;
    create_at: string;
    author: number;
    group: number | null;
    sections?: BlogSection[];
}

export interface BlogSection {
    id: number;
    sub_title: string;
    description: string;
    text: string;
    image: string | null;
}

export interface Video {
    id: number;
    video: string | null;
    video1: string | null;
    active: boolean;
    group: number | null;
    create_at: string;
}

export interface GalleryImage {
    id: number;
    title: string;
    image: string;
    active: boolean;
    group: number | null;
    create_at: string;
}

// Hooks
export const useBlogs = () => {
    return useQuery<Blog[]>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await api.get('/api/blogs/');
            return data;
        },
    });
};

export const useBlog = (id: string) => {
    return useQuery<Blog>({
        queryKey: ['blogs', id],
        queryFn: async () => {
            const { data } = await api.get(`/api/blogs/${id}/`);
            return data;
        },
        enabled: !!id,
    });
};

export const useVideos = () => {
    return useQuery<Video[]>({
        queryKey: ['videos'],
        queryFn: async () => {
            const { data } = await api.get('/api/videos/');
            return data;
        },
    });
};

export const useGallery = () => {
    return useQuery<GalleryImage[]>({
        queryKey: ['gallery'],
        queryFn: async () => {
            const { data } = await api.get('/api/gallery/');
            return data;
        },
    });
};

// Mutations
export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newBlog: Partial<Blog>) => {
            const { data } = await api.post('/api/blogs/', newBlog);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useUploadBlogImage = () => {
    return useMutation({
        mutationFn: async ({ blogId, formData }: { blogId: number; formData: FormData }) => {
            const { data } = await api.post(`/api/blogs/${blogId}/upload_image/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
    });
};

export const useUploadVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/videos/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['videos'] });
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
