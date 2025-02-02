import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-content p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;