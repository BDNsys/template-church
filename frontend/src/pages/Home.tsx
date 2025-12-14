import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import { useUser } from '../hooks/useUser';
import Spinner from '../components/ui/Spinner';
import './Home.css';

const Home: React.FC = () => {
    const { data: user, isLoading } = useUser();

    if (isLoading) {
        return (
            <DashboardLayout>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <Spinner size="lg" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="home">
                <div className="home__header">
                    <h1 className="home__title">
                        Welcome back, <span className="text-gradient">{user?.username}</span>! 👋
                    </h1>
                    <p className="home__subtitle">
                        Here's what's happening with your account today.
                    </p>
                </div>

                <div className="home__grid">
                    <Card variant="gradient" hover>
                        <div className="stat-card">
                            <div className="stat-card__icon">👤</div>
                            <div className="stat-card__content">
                                <h3 className="stat-card__label">Username</h3>
                                <p className="stat-card__value">{user?.username}</p>
                            </div>
                        </div>
                    </Card>

                    <Card variant="gradient" hover>
                        <div className="stat-card">
                            <div className="stat-card__icon">📧</div>
                            <div className="stat-card__content">
                                <h3 className="stat-card__label">Email</h3>
                                <p className="stat-card__value">{user?.email || 'Not set'}</p>
                            </div>
                        </div>
                    </Card>

                    <Card variant="gradient" hover>
                        <div className="stat-card">
                            <div className="stat-card__icon">🎯</div>
                            <div className="stat-card__content">
                                <h3 className="stat-card__label">Role</h3>
                                <p className="stat-card__value">
                                    {user?.is_superuser ? 'Super Admin' : user?.is_staff ? 'Admin' : 'Member'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card variant="gradient" hover>
                        <div className="stat-card">
                            <div className="stat-card__icon">✨</div>
                            <div className="stat-card__content">
                                <h3 className="stat-card__label">Status</h3>
                                <p className="stat-card__value">Active</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card variant="glass" className="home__welcome-card">
                    <h2 className="home__welcome-title">🚀 Getting Started</h2>
                    <p className="home__welcome-text">
                        This is your dashboard. You can customize this page to show relevant information
                        for your application. Add widgets, charts, or any other content you need.
                    </p>
                    <div className="home__features">
                        <div className="feature-item">
                            <span className="feature-item__icon">✓</span>
                            <span>JWT Authentication</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-item__icon">✓</span>
                            <span>TanStack Query Integration</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-item__icon">✓</span>
                            <span>Beautiful UI Components</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-item__icon">✓</span>
                            <span>Scalable Architecture</span>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Home;
