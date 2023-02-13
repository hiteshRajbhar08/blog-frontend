import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import PostsTable from './pages/admin/PostsTable';
import UsersTable from './pages/admin/UsersTable';
import CategoryPage from './pages/category/CategoryPage';
import CreatePostPage from './pages/createPost/CreatePostPage';
import ForgotPasswordPage from './pages/forms/ForgotPasswordPage';
import LoginPage from './pages/forms/LoginPage';
import RegisterPage from './pages/forms/RegisterPage';
import ResetPasswordPage from './pages/forms/ResetPasswordPage';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import PostPage from './pages/post/PostPage';
import PostDetailsPage from './pages/postDetails/PostDetailsPage';
import ProfilePage from './pages/profile/ProfilePage';
import Toast from './utils/Toast';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="posts">
          <Route index element={<PostPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="details/:id" element={<PostDetailsPage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
        </Route>

        <Route path="admin-dashboard">
          <Route index element={<AdminDashboardPage />} />
          <Route path="users-table" element={<UsersTable />} />
          <Route path="posts-table" element={<PostsTable />} />
          <Route path="comments-table" element={<CommentsTable />} />
          <Route path="categories-table" element={<CategoriesTable />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toast />
    </Router>
  );
};

export default App;
