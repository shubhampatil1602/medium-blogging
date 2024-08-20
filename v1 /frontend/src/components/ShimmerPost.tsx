const ShimmerPost = () => {
  return (
    <div className='max-w-screen-xl mx-auto mt-10 px-10 grid gap-6 grid-cols-12'>
      <div className='col-span-8'>
        <div className='animate-pulse bg-white border-b border-slate-200 p-4'>
          <div className='h-12 bg-gray-200 rounded-full w-48 mb-3'></div>
          <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
          <div className='flex items-center mt-3'>
            <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
            <div className='ml-3'>
              <div className='h-4 bg-gray-200 rounded-full w-20'></div>
              <div className='h-2 bg-gray-200 rounded-full w-16 mt-1'></div>
            </div>
          </div>
          <div className='h-64 bg-gray-200 mt-4 rounded-lg'></div>
        </div>
      </div>
      <div className='col-span-4'>
        <div className='animate-pulse bg-white border-b border-slate-200 p-4'>
          <span className='p-2'>Author</span>
          <div className='flex gap-3 mt-3'>
            <div className='h-16 w-16 bg-gray-200 rounded-full flex justify-center items-center'></div>
            <div className='flex flex-col gap-2'>
              <div className='h-8 bg-gray-200 rounded-full w-40'></div>
              <div className='h-4 bg-gray-200 rounded-full w-60'></div>
              <div className='h-4 bg-gray-200 rounded-full w-52'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerPost;
