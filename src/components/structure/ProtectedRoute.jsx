import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
