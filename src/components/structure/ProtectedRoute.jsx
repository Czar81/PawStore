import { useUserStore } from '@/store/userStore';
import NotFound from '@/components/generic/NotFound';

function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  onUnauthorized = null 
}) {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    if (onUnauthorized) {
      onUnauthorized();
    }
    return (
      <main className="main-text">
        <NotFound
          title="Se requiere autenticación"
          desc="Por favor, inicia sesión para acceder a este contenido"
        />
      </main>
    );
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    if (onUnauthorized) {
      onUnauthorized();
    }
    return (
      <main className="main-text">
        <NotFound
          title="Acceso denegado"
          desc="No tienes permisos para acceder a este contenido"
        />
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;
