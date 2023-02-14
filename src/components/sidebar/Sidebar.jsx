import { Link } from 'react-router-dom';
import './sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/actions/categoryAction';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories?.map((category) => (
          <Link
            to={`/posts/categories/${category?.title}`}
            key={category?._id}
            className="sidebar-link"
          >
            {category?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
