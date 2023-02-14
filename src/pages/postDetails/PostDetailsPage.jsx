import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
import './postDetails.css';
import swal from 'sweetalert';
import UpdatePostModal from './UpdatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from '../../redux/actions/postAction';
import Loader from '../../components/Loader/Loader';

const PostDetailsPage = () => {
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('there is no file!');

    const formData = new FormData();
    formData.append('image', file);
    dispatch(updatePostImage(post?._id, formData));
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label className="update-post-image" htmlFor="file">
              <i className="bi bi-image-fill"></i> select new image
            </label>
            <input
              style={{ display: 'none' }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.profilePhoto?.url}
          alt={post?.user.username}
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              className={
                post?.likes.includes(user?._id)
                  ? 'bi bi-hand-thumbs-up-fill'
                  : 'bi bi-hand-thumbs-up'
              }
              onClick={() => dispatch(toggleLikePost(post?._id))}
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      <AddComment />
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetailsPage;
