import { Button } from '@/components/ui/button';
import createGroupImage from '@/assets/img/create-group.jpeg';

const GroupsFeature = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='order-1 md:order-1'>
            <p className='font-semibold text-sm mb-2 font-sarabun'>Group</p>
            <h2 className='text-3 xl font-normal mb-3'>
              Easily Create and Join Expense Groups
            </h2>
            <p className='mb-4'>
              Managing shared expenses has never been easier. With Divvy, you
              can create and join groups effortlessly, ensuring everyone stays
              on the same page.
            </p>
            <Button variant='link' className='p-0 text-[#FF8E8E]'>
              Learn More →
            </Button>
            {/* Create a  */}
          </div>
          <div className='order-2 md:order-2'>
            <img
              src={createGroupImage}
              alt='People discussing expenses'
              className='rounded-lg w-full h-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupsFeature;
