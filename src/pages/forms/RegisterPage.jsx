import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authAction';
import Loader from '../../components/Loader/Loader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === '') return toast.error('Username is required');
    if (email.trim() === '') return toast.error('Email is required');
    if (password.trim() === '') return toast.error('Password is required');

    dispatch(registerUser({ username, email, password }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default RegisterPage;
