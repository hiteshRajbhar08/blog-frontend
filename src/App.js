import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CategoryPage from './pages/category/CategoryPage';
import CreatePostPage from './pages/createPost/CreatePostPage';
import LoginPage from './pages/forms/LoginPage';
import RegisterPage from './pages/forms/RegisterPage';
import HomePage from './pages/home/HomePage';
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
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="posts">
          <Route index element={<PostPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="details/:id" element={<PostDetailsPage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      </Routes>
      <Footer />
      <Toast />
    </Router>
  );
};

export default App;
