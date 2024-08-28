import { Link } from 'react-router-dom';
import { BsMedium } from 'react-icons/bs';
import { PiNotePencilLight } from 'react-icons/pi';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Some Component must be used within an AuthContext.Provider'
    );
  }

  const { showAuth, setShowAuth } = context;

  const handleLogout = () => {
    localStorage.removeItem('blogging-token');
    setShowAuth(true);
  };
  useEffect(() => {
    setShowAuth(localStorage.getItem('blogging-token') ? false : true);
  }, [showAuth]);
  return (
    <nav className='sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <div className='sm:w-3/4 w-11/12 h-16 flex justify-between items-center mx-auto'>
        <Link
          to='/'
          className='text-2xl font-bold flex justify-center items-center gap-2.5'
        >
          <BsMedium />{' '}
          <span className='font-serif hidden sm:block'>Blogging</span>
        </Link>
        {/* <div className='invisible sm:visible w-80'>
          <input
            className='bg-gray-100 outline-none text-gray-900 text-sm rounded-full w-full px-4 py-2.5'
            placeholder='Search'
          />
        </div> */}
        <div className='flex gap-3.5 sm:gap-6'>
          <button className='flex justify-center items-center text-slate-600'>
            <PiNotePencilLight size={25} />
            <Link to={'/write'} className='text-xs sm:text-sm'>
              Write
            </Link>
          </button>
          {showAuth ? (
            <>
              <button className='text-xs sm:text-sm'>
                <Link
                  to={'/signup'}
                  className='px-5 py-2 rounded-full bg-green-700/90 text-white'
                >
                  Signup
                </Link>
              </button>
              <button className='text-xs sm:text-sm text-slate-600'>
                {' '}
                <Link to={'/signin'}>Signin</Link>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className='text-xs sm:text-sm text-slate-600'
            >
              {' '}
              <Link to={'/'}>Logout</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
