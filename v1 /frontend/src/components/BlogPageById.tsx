import { Blog } from '../hooks';
import Appbar from './Appbar';
import { Avatar } from './BlogCard';

export default function BlogPageById({ blog }: { blog: Blog }) {
  return (
    <>
      <Appbar />
      <div className='grid gap-6 grid-cols-12 px-10 mt-10 max-w-screen-xl mx-auto'>
        <div className='col-span-8'>
          <div className='text-4xl font-extrabold py-2 px-3'>{blog.title}</div>
          <div className='text-slate-500 px-3'>Posted on June 1st, 2024</div>
          <div className='p-3 mt-3'>{blog.content}</div>
        </div>
        <div className='col-span-4'>
          <span className='p-2'>Author</span>
          <div className='flex gap-3 mt-3'>
            <div className='flex justify-center items-center p-2'>
              <Avatar name={blog.author.name} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-3xl font-extrabold'>
                {blog.author.name || 'Anonymous'}
              </p>
              <p>
                Master of mirth, purveyor of puns, and the funniest person in
                the kingdom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
