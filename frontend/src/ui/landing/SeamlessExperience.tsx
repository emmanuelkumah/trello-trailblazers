import { Button } from '@/components/ui/button';
import teamExpenseImage from '@/assets/img/team-expense-management.jpeg';

const SeamlessExperience = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl font-bold mb-8'>
          Experience Seamless Expense Management with Divvy
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <img
              src={teamExpenseImage}
              alt='Team expense management'
              className='rounded-lg w-full h-auto'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div>
              <div className='bg-black rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center'>
                <span className='text-white'>📊</span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Easy Scanning</h3>
              <p className='text-sm text-gray-700 mb-3'>
                Quickly scan receipts and add new expenses on the go.
              </p>
              <Button variant='link' className='p-0 text-[#FF8E8E]'>
                Learn More →
              </Button>
            </div>

            <div>
              <div className='bg-black rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center'>
                <span className='text-white'>💰</span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>
                Smart Expense Calculation
              </h3>
              <p className='text-sm text-gray-700 mb-3'>
                Our intelligent system automatically distributes costs according
                to your preferences.
              </p>
              <Button variant='link' className='p-0 text-[#FF8E8E]'>
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeamlessExperience;
