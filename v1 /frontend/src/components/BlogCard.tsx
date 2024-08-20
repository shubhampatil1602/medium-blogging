import { Link } from 'react-router-dom';

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export default function BlogCard({
  id,
  authorName,
  content,
  publishedDate,
  title,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`} className='border-b pb-2 cursor-pointer'>
      <div className='text-sm font-thin px-5 py-3'>
        <Avatar name={authorName} />
        <span className='font-semibold ml-2'>{authorName} ·</span>{' '}
        {publishedDate}
      </div>
      <div className='font-bold text-2xl px-5'>{title}</div>
      <div className='font-light text-slate-600 px-5 py-1 leading-tight'>
        {content.slice(0, 100) + '...'}
      </div>
      <div className='px-5 py-3 font-thin text-sm'>{`${Math.ceil(
        content.length / 500
      )} min read.`}</div>
    </Link>
  );
}

export function Circle() {
  return <div className='h-1 w-1 rounded-full bg-slate-500'></div>;
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className='relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-300 rounded-full'>
      <span className='font-medium text-gray-600'>{name[0]}</span>
    </div>
  );
}
