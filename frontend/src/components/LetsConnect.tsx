import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';

const LetsConnect = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center gap-2'>
        <a
          href='https://github.com/shubhampatil1602'
          className='flex items-center'
          target='_blank'
        >
          <FaGithub color='white' size={20} />
        </a>
        <a
          href='https://x.com/shubhamsp1602'
          className='flex items-center'
          target='_blank'
        >
          <RiTwitterXLine color='white' size={20} />
        </a>
        <a
          href='https://www.linkedin.com/in/shubhmpatil/'
          className='flex items-center'
          target='_blank'
        >
          <FaLinkedin color='white' size={20} />
        </a>
      </div>
    </div>
  );
};

export default LetsConnect;
