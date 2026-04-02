import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { logout as logoutAPI } from '@/services/user/authService';

function AuthSection() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const logout = useUserStore((state) => state.logout);
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
