import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './createPost.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/actions/postAction';
import Loader from '../../components/Loader/Loader';
import { fetchCategories } from '../../redux/actions/categoryAction';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === '') return toast.error('Post Title is required');
    if (category.trim() === '') return toast.error('Post Category is required');
    if (description.trim() === '')
      return toast.error('Post Description is required');
    if (!file) return toast.error('Post Image is required');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (isPostCreated) {
      navigate('/');
    }
  }, [navigate, isPostCreated]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={submitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="create-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories?.map((category) => (
            <option key={category?._id} value={category?.title}>
              {category?.title}
            </option>
          ))}
        </select>
        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          Create
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;
