import { useUserStore } from '@/store/userStore';
import { logout as logoutAPI } from '@/services/user/authService';

function AuthSection({ setActiveView }) {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logoutAPI();
    logout();
    setActiveView('start');
  };

  const handleLoginClick = () => {
    setActiveView('login');
  };

  return (
    <div className="nav-auth">
      {isAuthenticated && user ? (
        <>
          <span className="nav-user">
            Sesión: <strong>{user.email}</strong>
            {user.role === 'admin' && (
              <span className="nav-role admin">admin</span>
            )}
          </span>
          <button className="btn btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button className="btn btn-lilac" onClick={handleLoginClick}>
          Iniciar sesión
        </button>
      )}
    </div>
  );
}

export default AuthSection;
