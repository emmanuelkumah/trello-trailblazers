import { Button } from '@/components/ui/button';
import heroImage from '@/assets/img/hero-image.jpeg';

const HeroSection = () => {
  return (
    <section className='py-16 bg-[#FFE8E8] text-black'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h1 className='text-4xl md:text-5xl mb-4 font-normal'>
              Effortless Expense Sharing for Every Occasion
            </h1>
          </div>
          <div>
            <p className='text-lg mb-6 font-sarabun'>
              Divide bills and expenses simply, keep track of IOUs, and settle
              costs between friends, family, and roommates. Simplify expense
              splitting for trips, dinners, and any shared expenses.
            </p>
            <div className='flex items-center'>
              <Button className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full px-6 font-sarabun'>
                Get Started
              </Button>
              <Button
                variant='outline'
                className='ml-4 text-gray-700 rounded-full border-2 border-gray-300 px-6 bg-transparent hover:bg-transparent font-sarabun'
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <img
            src={heroImage}
            alt='Two people looking at a tablet'
            className='rounded-lg shadow-md w-full h-auto'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
