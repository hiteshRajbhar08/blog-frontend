import { useEffect, useState } from 'react';
import './profile.css';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import PostList from '../../components/posts/PostList';
import { posts } from '../../dummyData';
import UpdateProfileModal from './UpdateProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserProfile,
  reset,
} from '../../redux/features/profile/profileSlice';
import Loader from '../../components/Loader/Loader';

const ProfilePage = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(reset());
    }
    dispatch(getUserProfile(id));
  }, [dispatch, error, id]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('there is no file!');

    console.log('image uploaded');
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover your account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Account has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Something went wrong!');
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">
              upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && (
        <UpdateProfileModal setUpdateProfile={setUpdateProfile} />
      )}
    </section>
  );
};

export default ProfilePage;
