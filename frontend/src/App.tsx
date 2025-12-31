import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GoogleCallback from './pages/GoogleCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/ui/Toast';
import { clearTokens } from './utils/token';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Blogs from './pages/public/Blogs';
import BlogDetail from './pages/public/BlogDetail';
import Gallery from './pages/public/Gallery';
import Videos from './pages/public/Videos';
import Contact from './pages/public/Contact';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import GroupManagement from './pages/dashboard/GroupManagement';
import MemberManagement from './pages/dashboard/MemberManagement';
import FinanceDashboard from './pages/dashboard/FinanceDashboard';
import ContentDashboard from './pages/dashboard/ContentDashboard';

function Logout() {
  clearTokens();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  clearTokens();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="groups" element={<GroupManagement />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="finance" element={<FinanceDashboard />} />
          <Route path="content" element={<ContentDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
