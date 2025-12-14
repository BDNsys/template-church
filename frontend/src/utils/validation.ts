export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }

    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Invalid email format' };
    }

    return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
    if (!username) {
        return { isValid: false, error: 'Username is required' };
    }

    if (username.length < 3) {
        return { isValid: false, error: 'Username must be at least 3 characters' };
    }

    if (username.length > 30) {
        return { isValid: false, error: 'Username must be less than 30 characters' };
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
        return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters' };
    }

    return { isValid: true };
};

export interface PasswordStrength {
    score: number; // 0-4
    label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
    color: string;
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;

    if (!password) {
        return { score: 0, label: 'Very Weak', color: '#ef4444' };
    }

    // Length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Contains lowercase
    if (/[a-z]/.test(password)) score++;

    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;

    // Contains numbers
    if (/\d/.test(password)) score++;

    // Contains special characters
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Normalize to 0-4
    const normalizedScore = Math.min(Math.floor(score / 1.5), 4);

    const labels: PasswordStrength['label'][] = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];

    return {
        score: normalizedScore,
        label: labels[normalizedScore],
        color: colors[normalizedScore],
    };
};
