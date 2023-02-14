import { Link } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../redux/actions/postAction';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Blog</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
