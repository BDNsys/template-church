export interface GroupMembership {
    group_id: number;
    group_name: string;
    role: 'MAKER' | 'APPROVER' | 'AUDITOR';
    group_type?: 'LEADERSHIP' | 'FINANCE' | 'GENERAL' | 'TECH'; // Optional as it might not be in token directly unless added
}

export interface User {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    groups?: GroupMembership[];
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    email?: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface DecodedToken {
    user_id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    groups?: GroupMembership[];
    exp: number;
    iat: number;
}

export interface ApiError {
    message: string;
    status?: number;
    errors?: Record<string, string[]>;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}
