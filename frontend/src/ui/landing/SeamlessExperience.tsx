import { Button } from '@/components/ui/button';
import teamExpenseImage from '@/assets/img/team-expense-management.jpeg';

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='m21.406 6.086l-9-4a1 1 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035c-.028.014-.058.023-.084.04c-.022.015-.039.034-.06.05a.9.9 0 0 0-.19.194q-.031.04-.059.081a1 1 0 0 0-.076.165c-.009.027-.023.052-.031.079A1 1 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a1 1 0 0 0 .402-.096l.004.01l9-4A1 1 0 0 0 22 17V7a1 1 0 0 0-.594-.914M12 4.095L18.538 7L12 9.905l-1.308-.581L5.463 7zm1 15.366V11.65l7-3.111v7.812z'
    ></path>
  </svg>
);

const SeamlessExperience = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='order-1 md:order-1'>
            <p className='font-semibold mb-3 font-sarabun'>Clarity</p>
            <h2 className='text-3xl font-normal mb-3'>
              Experience Seamless Expense Management with Divvy
            </h2>
            <p className='mb-4'>
              Divvy offers a transparent platform for managing shared expenses.
              Enjoy fair splitting and effortless settlements with friends and
              family.
            </p>
            <div className='flex flex-col md:flex-row items-start md:items-center mb-4'>
              <div className='flex flex-col mb-4 md:mb-0 md:mr-4'>
                <Icon />
                <h3 className='my-2 text-lg font-normal'>Transparency</h3>
                <p className='text-sm text-gray-500'>
                  Know who owes what with clear visibility on all expenses.
                </p>
              </div>
              <div className='flex flex-col'>
              <Icon />
              <h3 className='my-2 text-lg font-normal'>Fairness</h3>
                <p className='text-sm text-gray-500'>
                  Everyone pays their share, ensuring no one is left out.
                </p>
              </div>
            </div>
            <Button
              variant='secondary'
              className='mr-4 bg-transparent rounded-full border-2 cursor-pointer'
            >
              Learn More
            </Button>
            <Button
              variant='link'
              className='text-black cursor-pointer rounded-full'
            >
              Sign up
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='-ml-1'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4l8 8-8 8'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                />
              </svg>
            </Button>
          </div>
          <div className='order-2 md:order-2'>
            <img
              src={teamExpenseImage}
              alt='People discussing expenses'
              className='rounded-lg w-full h-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeamlessExperience;
