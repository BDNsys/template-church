import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthStatus";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthorized = useAuth();

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
