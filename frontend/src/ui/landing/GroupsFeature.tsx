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
            <div className='flex items-center mb-4'>
              <div className='flex flex-col mr-4'>
                <h3 className='text-lg font-normal'>Create Groups</h3>
                <p className='text-sm text-gray-500'>
                  Set up your group with a title and purpose in just a few
                  clicks.
                </p>
              </div>
              <div className='flex flex-col'>
                <h3 className='text-lg font-normal'>Join Groups</h3>
                <p className='text-sm text-gray-500'>
                  Easily join existing groups via link or unique group code.
                </p>
              </div>
            </div>
            {/* Create a secondary button with the text "sign up" */}
            <Button variant='secondary' className='mr-4 bg-transparent rounded-full border-2 cursor-pointer'>
              Sign Up
            </Button>
            <Button variant='link' className='p-0 text-black'>
              Learn More
            </Button>
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
