import { Button } from '@/components/ui/button';
import heroImage from '@/assets/img/hero-image.jpeg';

const HeroSection = () => {
  return (
    <section className='py-14 bg-[#FFE8E8] text-black'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h1 className='text-4xl md:text-5xl mb-4 font-normal'>
              Effortless Expense Sharing for Every Occasion
            </h1>
          </div>
          <div>
            <p className='text-base mb-6 font-sarabun'>
              Divvy simplifies group expenses, making it easy to track, split,
              and settle costs with friends or colleagues. Experience
              transparency and fairness in every transaction, ensuring everyone
              is on the same page.
            </p>
            <div className='flex items-center'>
              <Button
                className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full px-6 font-sarabun cursor-pointer transition-colors duration-200'
              >
                Get Started
              </Button>
              <Button
                variant='outline'
                className='ml-4 text-gray-700 rounded-full border-2 border-gray-300 px-6 bg-transparent hover:bg-gray-100 cursor-pointer transition-colors duration-200 font-sarabun'
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
