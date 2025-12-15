import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GoogleCallback from './pages/GoogleCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/ui/Toast';
import { clearTokens } from './utils/token';

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
