import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants';
import BlogData from '../components/BlogData';
import { BlogInterface } from '../types/type';
import { CiCirclePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Shimmer from '../components/Shimmer';

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [myBlogs, setMyBlogs] = useState<BlogInterface[]>([]);
  const [msg, setMsg] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [blogType, setBlogType] = useState('All Blogs');

  const fetchMyBlogs = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/blog/my-blogs`, {
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('blogging-token')}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.msg) {
        setMsg(data.msg);
        console.log(data);
      }
      setMyBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/blog/bulk?page=${page}`
      );
      const data = await response.json();
      setBlogs(data?.blogs);
      setTotalPages(data?.pagination?.totalPages);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, [page]);

  return blogs?.length === 0 ? (
    <div className='mt-24'>
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
    </div>
  ) : (
    <section className='w-11/12 sm:w-3/4 md:w-2/4 mx-auto min-h-[85vh]'>
      <div className='border-b transition-all text-sm text-gray-600 flex items-center gap-4 mb-8 mt-3'>
        <Link to={'/write'} className={`cursor-pointer px-3`}>
          <CiCirclePlus size={30} />
        </Link>
        <span
          onClick={() => setBlogType('All Blogs')}
          className={`cursor-pointer py-6 ${
            blogType === 'All Blogs' && 'border-black border-b'
          }`}
        >
          All Blogs
        </span>
        {localStorage.getItem('blogging-token') && (
          <span
            onClick={() => {
              setBlogType('Your Blogs');
              fetchMyBlogs();
            }}
            className={`cursor-pointer py-6 ${
              blogType === 'Your Blogs' && 'border-black border-b'
            }`}
          >
            Your Blogs
          </span>
        )}
      </div>
      {blogType === 'All Blogs' ? (
        blogs?.map((blog) => (
          <BlogData
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            publishedOn={blog.publishedOn}
            name={blog.author.name}
          />
        ))
      ) : blogType === 'Your Blogs' && myBlogs?.length === 0 ? (
        <>
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </>
      ) : msg ? (
        <Link to={'/write'}>
          <div className='text-center mt-20 hover:underline'>{msg}</div>
        </Link>
      ) : (
        myBlogs?.map((blog) => (
          <BlogData
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            publishedOn={blog.publishedOn}
            name={blog.author.name}
          />
        ))
      )}

      {blogType === 'All Blogs' && (
        <div className='text-center mt-10'>
          {page > 1 && (
            <button
              className='mr-4 text-sm hover:underline'
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev.
            </button>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <button
              className={`py-2 px-4 bg-gray-100 hover:bg-gray-200 text-sm mr-3 ${
                page === i + 1 && 'bg-gray-400/60'
              }`}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              {i + 1}
            </button>
          ))}
          {page < totalPages && (
            <button
              className='ml-4 text-sm hover:underline'
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Blogs;
