import { useEffect } from 'react';
import Pagination from '../../components/pagination/Pagination';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import { posts, categories } from '../../dummyData';
import './postPage.css';

const PostPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default PostPage;
