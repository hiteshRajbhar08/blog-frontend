import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import './category.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostBasedOnCategory } from '../../redux/actions/postAction';
import Loader from '../../components/Loader/Loader';

const CategoryPage = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  const { postCate, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [dispatch, category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="category">
      {postCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Post with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to the posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postCate} />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
