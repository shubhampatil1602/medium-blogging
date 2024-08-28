import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { useLogout } from '../hooks';

export default function Appbar() {
  const logout = useLogout();
  return (
    <div className='border-b flex justify-between items-center px-10 py-4'>
      <Link to='/blogs' className=''>
        Blogging
      </Link>
      <div className='flex justify-center items-center gap-4'>
        <Link
          to='/publish'
          className='py-1 px-4 rounded-3xl bg-green-600 text-white'
        >
          Publish
        </Link>
        <Link
          onClick={logout}
          to='/'
          className='py-1 px-4 rounded-3xl bg-red-600 text-white'
        >
          Logout
        </Link>
        <Avatar name='Shubham' />
      </div>
    </div>
  );
}
