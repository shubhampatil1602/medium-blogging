import { useParams } from 'react-router-dom';
import BlogPageById from '../components/BlogPageById';
import { useBlog } from '../hooks';
import Appbar from '../components/Appbar';
import ShimmerPost from '../components/ShimmerPost';

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || '',
  });

  if (loading) {
    return (
      <>
        <Appbar />
        <div className='mt-10'>
          <ShimmerPost />
        </div>
      </>
    );
  }
  return (
    <div className=''>
      <BlogPageById blog={blog} />
    </div>
  );
};
