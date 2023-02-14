import { useEffect, useState } from 'react';
import Pagination from '../../components/pagination/Pagination';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import './postPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPostsCount } from '../../redux/actions/postAction';
import Loader from '../../components/Loader/Loader';

const POST_PER_PAGE = 3;

const PostPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { postsCount, posts, loading } = useSelector((state) => state.post);

  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));

    window.scrollTo(0, 0);
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostPage;
