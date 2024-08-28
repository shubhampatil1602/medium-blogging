import { Link } from 'react-router-dom';
import { BlogProps } from '../types/type';
import { dateConverter } from '../common/function';

const BlogData = ({ title, content, publishedOn, name, id }: BlogProps) => {
  const formattedDate = dateConverter(publishedOn);
  return (
    <Link to={`/blog/${id}`}>
      <div className='pt-4 pb-6 transition-transform duration-300 hover:-translate-y-1 mb-6 border-b'>
        <div className='flex items-center gap-1'>
          <div className='h-7 w-7 flex justify-center items-center bg-gray-300 rounded-full border'>
            <span className='text-black text-sm'>{name[0].toUpperCase()}</span>
          </div>
          <h2 className='font-light text-sm'>
            {name} · <span className='text-gray-500'>{formattedDate}</span>
          </h2>
        </div>

        <div className='my-3'>
          <h3 className='text-xl font-semibold my-1'>{title}</h3>
          <p className='text-sm text-gray-600 font-serif line-clamp-2'>
            {content}
          </p>
        </div>

        <span className='text-sm text-gray-500'>3 min read</span>
      </div>
    </Link>
  );
};

export default BlogData;
