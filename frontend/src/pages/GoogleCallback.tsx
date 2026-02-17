import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setTokens } from '../utils/token';
import { verifyGoogleLogin } from '../services/auth';
import { useToast } from '../contexts/ToastContext';
import Spinner from '../components/ui/Spinner';

const GoogleCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        const code = searchParams.get('code');
        const verifier = sessionStorage.getItem('code_verifier');

        console.log('GoogleCallback mounted');
        console.log('Code from URL:', code ? 'Present' : 'Missing');
        console.log('Verifier from storage:', verifier ? 'Present' : 'Missing');

        if (code && verifier) {
            console.log('Initiating backend verification...');
            const handleLogin = async () => {
                try {
                    console.log('Calling verifyGoogleLogin...');
                    const tokens = await verifyGoogleLogin(code, verifier);
                    console.log('tokens received', tokens);
                    // verifyGoogleLogin now returns { access, refresh } with consistent naming
                    setTokens(tokens.access, tokens.refresh);
                    addToast('Login successful! Welcome back.', 'success');
                    sessionStorage.removeItem('code_verifier');
                    navigate('/');
                } catch (error) {
                    addToast('Google login failed. Authentication error.', 'error');
                    navigate('/login');
                }
            };
            handleLogin();
        } else {
            // ... (rest of the logic remains similar but cleaner)
            const access = searchParams.get('access');
            const refresh = searchParams.get('refresh');

            if (access && refresh) {
                setTokens(access, refresh);
                addToast('Login successful! Welcome back.', 'success');
                navigate('/');
            } else if (code && !verifier) {
                addToast('Authentication session expired. Please try again.', 'error');
                navigate('/login');
            } else {
                addToast('Google login failed. No tokens received.', 'error');
                navigate('/login');
            }
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
