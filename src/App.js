import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);

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
          <Route
            path="create-post"
            element={user ? <CreatePostPage /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetailsPage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
        </Route>

        <Route path="admin-dashboard">
          <Route
            index
            element={
              user?.isAdmin ? <AdminDashboardPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toast />
    </Router>
  );
};

export default App;
