import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { logout as logoutAPI } from '@/services/user/authService';

function AuthSection() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAPI();
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="nav-auth">
      {isAuthenticated && user ? (
        <>
          <span className="nav-user">
            Session: <strong>{user.email}</strong>
            {user.role === 'admin' && (
              <span className="nav-role admin">admin</span>
            )}
          </span>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="btn btn-lilac" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
}

export default AuthSection;
