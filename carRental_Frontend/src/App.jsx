import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AuthProvider, useAuth } from './pages/auth/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/home/Home';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AdminLogin from './admin/pages/AdminLogin';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminDashboard from './admin/components/AdminDashboard';
import UserHome from './user/pages/userHome';
import Booking from './user/components/Booking';
import ErrorBoundary from './user/components/ErrorBoundary';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/users/signin" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="auth/signin" element={<SignIn />} />
            <Route path="auth/signup" element={<SignUp />} />
          </Route>

          {/* Protected user routes */}
          <Route path="/userhome" element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          } />
          <Route path="/bookings" element={
            <PrivateRoute>
              <ErrorBoundary>
                <Booking />
              </ErrorBoundary>
            </PrivateRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
