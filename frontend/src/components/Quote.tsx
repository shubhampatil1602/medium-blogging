const Quote = () => {
  return (
    <div className='w-[50%] bg-slate-200 h-screen md:flex justify-center flex-col hidden'>
      <div className='flex flex-col justify-center mx-auto px-10 lg:px-0'>
        <h2 className='max-w-lg text-xl lg:text-3xl font-bold'>
          &#x301D;There are three gates leading to the hell of self-destruction
          for the soul — lust, anger, and greed. Therefore, all should abandon
          these three. These traits are the main source of all the problems of
          life.&#x301E;
        </h2>

        <h4 className='mb-4 mt-2 text-slate-700 font-semibold text-sm lg:text-base'>
          ~ Bhagavad Gita — Chapter 16 — Verse 21
        </h4>
      </div>
    </div>
  );
};

export default Quote;
