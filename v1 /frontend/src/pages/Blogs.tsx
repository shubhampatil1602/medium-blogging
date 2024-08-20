import Appbar from '../components/Appbar';
import BlogCard from '../components/BlogCard';
import Shimmer from '../components/Shimmer';
import { useBlogs } from '../hooks';

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <>
        <Appbar />
        <div className='mt-10'>
          <Shimmer /> <Shimmer /> <Shimmer /> <Shimmer /> <Shimmer />
        </div>
      </>
    );
  }
  return (
    <>
      <Appbar />
      <div className='flex flex-col justify-center max-w-2xl mx-auto gap-4 mt-10'>
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || ''}
            content={blog.content}
            publishedDate='13th June 2024'
            title={blog.title}
          />
        ))}
      </div>
    </>
  );
};
