import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';

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
export const useBlogs = () => {
    return useQuery<Blog[]>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await api.get('/blogs/');
            return data;
        },
    });
}
export const useBlog = (id: string) => {
    return useQuery<Blog>({
        queryKey: ['blogs', id],
        queryFn: async () => {
            const { data } = await api.get(`/blogs/${id}/`);
            return data;
        },
        enabled: !!id,
    });
};

// Mutations
export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newBlog: Partial<Blog>) => {
            const { data } = await api.post('/blogs/', newBlog);
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
            const { data } = await api.post(`/blogs/${blogId}/upload_image/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
    });
};