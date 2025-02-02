
import { useAdminAuth } from '../admin/context/AdminAuthContext';

const AdminNavbar = () => {
  const { logout } = useAdminAuth();

  return (
    <nav className="admin-navbar bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;