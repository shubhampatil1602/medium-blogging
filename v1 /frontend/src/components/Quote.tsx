import { FaLinkedin } from 'react-icons/fa';
export const Quote = () => {
  return (
    <div className='bg-slate-200 h-screen lg:flex justify-center flex-col hidden'>
      <div className='flex flex-col justify-center m-auto'>
        <div className='max-w-lg text-3xl font-bold'>
          "The future isn't something we enter, but something we create. By
          shaping our actions and dreams today, we carve out the path for
          tomorrow."
        </div>
        <div className='max-w-lg text-2xl font-semibold mt-4'>
          Shubham Patil
        </div>
        <div className='max-w-lg'>
          <a
            href='https://www.linkedin.com/in/shubhmpatil/'
            className='flex items-center'
            target='_blank'
          >
            <span className='mr-2 font-light'>Let's Connect</span>{' '}
            <FaLinkedin color='blue' size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
