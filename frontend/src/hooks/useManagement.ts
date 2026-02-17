import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

// Types
export interface ChurchGroup {
    id: number;
    name: string;
    group_type: 'LEADERSHIP' | 'FINANCE' | 'GENERAL' | 'TECH';
    created_by: number;
}

export interface Member {
    id: number;
    user: number; // User ID
    group: number;
    role: 'MAKER' | 'APPROVER' | 'AUDITOR';
}

export interface FinanceRecord {
    id: number;
    amount: number;
    description: string;
    date: string;
    group: number;
    created_by: number;
}

// Hooks
export const useGroups = () => {
    return useQuery<ChurchGroup[]>({
        queryKey: ['groups'],
        queryFn: async () => {
            const { data } = await api.get('/groups/');
            return data;
        },
    });
};

export const useMembers = () => {
    return useQuery<Member[]>({
        queryKey: ['members'],
        queryFn: async () => {
            const { data } = await api.get('/group-memberships/');
            return data;
        },
    });
};

export const useFinanceRecords = () => {
    return useQuery<FinanceRecord[]>({
        queryKey: ['finance'],
        queryFn: async () => {
            const { data } = await api.get('/finance/');
            return data;
        },
    });
};

// Mutations
export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newGroup: Partial<ChurchGroup>) => {
            const { data } = await api.post('/groups/', newGroup);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });
};

export const useAddMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newMember: Partial<Member>) => {
            const { data } = await api.post('/group-memberships/', newMember);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
};

export const useCreateFinanceRecord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newRecord: Partial<FinanceRecord>) => {
            const { data } = await api.post('/finance/', newRecord);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['finance'] });
        },
    });
};
