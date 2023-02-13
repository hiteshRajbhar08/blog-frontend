import AdminMain from './AdminMain';
import AdminSidebar from './AdminSidebar';
import './admin.css';

const AdminDashboardPage = () => {
  return (
    <section className="admin-dashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
};

export default AdminDashboardPage;
