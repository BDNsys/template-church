import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setTokens } from '../utils/token';
import { useToast } from '../contexts/ToastContext';
import Spinner from '../components/ui/Spinner';

const GoogleCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        const access = searchParams.get('access');
        const refresh = searchParams.get('refresh');

        if (access && refresh) {
            setTokens(access, refresh);
            addToast('Login successful! Welcome back.', 'success');
            navigate('/');
        } else {
            addToast('Google login failed. No tokens received.', 'error');
            navigate('/login');
        }
    }, [searchParams, navigate, addToast]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'var(--bg-primary)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <Spinner size="lg" />
                <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                    Completing secure login...
                </p>
            </div>
        </div>
    );
};

export default GoogleCallback;
