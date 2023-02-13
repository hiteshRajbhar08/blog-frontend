import { Link } from 'react-router-dom';
import './notFound.css';

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <div className="not-found-title">404</div>
      <h1 className="not-found-text">Page Not Found</h1>
      <Link className="not-found-link" to="/">
        Got to home page
      </Link>
    </section>
  );
};

export default NotFoundPage;
