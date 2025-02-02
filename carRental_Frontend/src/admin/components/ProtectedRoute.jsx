
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const ProtectedRoute = () => {
  const { admin } = useAdminAuth();
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;