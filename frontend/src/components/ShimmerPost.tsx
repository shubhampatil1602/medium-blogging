const ShimmerPost = () => {
  return (
    <div className='w-11/12 sm:w-3/4 md:w-2/4 mx-auto min-h-[85vh] mt-10 grid gap-6 grid-cols-12'>
      <div className='col-span-12'>
        <div className='animate-pulse bg-white p-4'>
          <div className='h-10 bg-gray-200 rounded-full w-2/3 mb-12'></div>
          <div className='flex items-center mt-3 border-y py-3'>
            <div className='h-12 w-12 bg-gray-200 rounded-full'></div>
            <div className='ml-3'>
              <div className='h-4 bg-gray-200 rounded-full w-20'></div>
              <div className='h-2 bg-gray-200 rounded-full w-full mt-2'></div>
            </div>
          </div>
          <div className='h-64 mt-16 bg-gray-200 rounded-lg'></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerPost;
