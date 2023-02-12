import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CreatePostPage from './pages/createPost/CreatePostPage';
import LoginPage from './pages/forms/LoginPage';
import RegisterPage from './pages/forms/RegisterPage';
import HomePage from './pages/home/HomePage';
import PostPage from './pages/post/PostPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/create-post" element={<CreatePostPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
