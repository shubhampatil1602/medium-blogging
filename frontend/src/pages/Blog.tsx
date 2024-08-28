import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
import { useEffect, useState } from 'react';
import { BlogInterface } from '../types/type';
import { dateConverter } from '../common/function';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ShimmerPost from '../components/ShimmerPost';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogInterface>();

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/blog/${id}`);
      const data = await response.json();
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return !blog ? (
    <ShimmerPost />
  ) : (
    <section className='w-11/12 sm:w-3/4 md:w-2/4 mx-auto min-h-[85vh]'>
      <div className='mt-10'>
        <h1 className='font-bold text-4xl'>{blog?.title}</h1>
        <div className='flex items-center justify-between gap-4 border-y my-10 py-3'>
          <div className='flex items-center gap-4 '>
            <div className='h-11 w-11 flex justify-center items-center bg-gray-300 rounded-full border'>
              <span className='text-black text-sm sm:text-base'>
                {blog?.author?.name[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className='font-medium'>~ {blog?.author?.name}</h4>
              <h5 className='text-sm text-gray-500'>
                <span>3 min read · </span>
                <span>
                  {dateConverter(blog?.publishedOn || String(Date.now()))}
                </span>
              </h5>
            </div>
          </div>
        </div>
        {/* <p className='font-serif text-base tracking-wider leading-relaxed'>
          {blog?.content}
        </p> */}
        <MarkdownPreview
          source={blog?.content}
          className='font-serif text-base tracking-wider leading-relaxed bg-white text-black markdown-preview'
        />
      </div>
    </section>
  );
};

export default Blog;
