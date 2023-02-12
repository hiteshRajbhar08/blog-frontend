import { useState } from 'react';
import { toast } from 'react-toastify';
import './createPost.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

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

    console.log({ title, category, description, file });
  };

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
          <option value="music">music</option>
          <option value="travelling">travelling</option>
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
