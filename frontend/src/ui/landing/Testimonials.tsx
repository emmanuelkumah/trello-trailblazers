import webflowLogo from '@/assets/img/webflow-logo.png';

const Testimonials = () => {
  return (
    <section className='py-16 bg-[#FFE8E8]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
          {/* Left Column: Grey Box */}
          <div className='bg-gray-800 h-100 rounded-lg flex items-center justify-center'>
            <div className='text-white text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='white'
                className='mx-auto mb-4'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className='flex flex-col items-center lg:items-start'>
            <div className='flex mb-4'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='#000000'
                  className='mx-1'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              ))}
            </div>
            <p className='text-center lg:text-left text-lg italic max-w-2xl mb-4'>
              "Divvy has transformed the way we manage our group expenses. It's
              simple, efficient, and has made splitting costs a breeze!"
            </p>
            <div className='flex items-center justify-center lg:justify-start w-full'>
              <div className='text-center lg:text-left border-r-2 pr-4 border-gray-500'>
                <div className='font-sarabun font-semibold'>Alex Johnson</div>
                <div className='text-sm'>Project Manager, TechCo</div>
              </div>
              <div className='ml-6'>
                <img
                  src={webflowLogo}
                  alt='Webflow'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
