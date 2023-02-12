import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post.image} alt={post.name} className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author:</strong>
            <Link className="post-item-username" to="/profile/1">
              {post.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${post.category}`}
          >
            {post.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post.description}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
          quibusdam? Ratione ut recusandae ipsum odio consectetur incidunt quae
          provident nemo soluta nisi accusamus maiores, tenetur nobis minus, ex
          numquam repudiandae?Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Libero sapiente illo, nobis corporis totam explicabo
          cum similique temporibus aliquid. Laborum labore tenetur omnis
          officiis blanditiis repudiandae, accusamus in beatae exercitationem.
        </p>
        <Link className="post-item-link" to={`/posts/details/${post._id}`}>
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
