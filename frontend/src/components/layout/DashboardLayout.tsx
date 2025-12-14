import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/token';
import './DashboardLayout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            <header className="dashboard-header">
                <div className="dashboard-header__content">
                    <div className="dashboard-header__logo">
                        <h2 className="text-gradient">Dashboard</h2>
                    </div>

                    <div className="dashboard-header__user">
                        <div className="dashboard-header__user-info">
                            <span className="dashboard-header__username">{user?.username || 'User'}</span>
                            <span className="dashboard-header__role">
                                {user?.is_staff ? 'Admin' : 'Member'}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="dashboard-header__logout">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-main__content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
