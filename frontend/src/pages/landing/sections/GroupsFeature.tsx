import { Button } from '@/components/ui/button';

const GroupsFeature = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='order-2 md:order-1'>
            <img
              src='/src/assets/create-groups.jpg'
              alt='People discussing expenses'
              className='rounded-lg w-full h-auto'
            />
          </div>
          <div className='order-1 md:order-2'>
            <h2 className='text-2xl font-bold mb-3'>
              Easily Create and Join Expense Groups
            </h2>
            <p className='mb-4'>
              Making it simple to create, join, and manage expense groups.
              Whether you're planning trips, sharing meals, or splitting
              household expenses, our intuitive interface helps you stay
              organized and keeps everyone in the loop.
            </p>
            <Button variant='link' className='p-0 text-[#FF8E8E]'>
              Learn More →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupsFeature;
