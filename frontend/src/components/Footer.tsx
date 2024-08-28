const Footer = () => {
  return (
    <footer className='bg-black/90 mt-10 h-16 sm:h-24 gap-y-2.5 text-white w-full flex flex-col text-center justify-center items-center'>
      <span className='w-full tracking-wide text-sm sm:text-base'>
        Made with ❤️ by{' '}
        <a
          href='https://github.com/shubhampatil1602'
          target='_blank'
          className='hover:underline font-semibold'
        >
          Shubham Patil
        </a>
      </span>
    </footer>
  );
};

export default Footer;
