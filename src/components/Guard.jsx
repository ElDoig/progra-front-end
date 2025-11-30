
import { Navigate } from 'react-router-dom';
import { useSession } from '../auth';

export function RequireLogin({ children }) {
  const { isLogged, loading } = useSession();

  if (loading) return <div>Cargando...</div>; 
  if (!isLogged) return <Navigate to="/login" replace />;
  return children;
}

export function RequireAdmin({ children }) {
  const { isAdmin, loading } = useSession();
  if (loading) return <div>Cargando...</div>; 
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}