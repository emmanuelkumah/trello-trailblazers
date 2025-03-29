import { Button } from '@/components/ui/button';

const ManagementFeature = () => {
  return (
    <section className='py-16 bg-[#FFF8E8]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h2 className='text-2xl font-bold mb-3'>
              Effortless Expense Management: Track, Split, and Settle with Ease
            </h2>
            <p className='mb-4'>
              Split costs with friends effortlessly. With one simple
              calculation, everyone pays their fair share. No more confusion, no
              more mental math—just simple, fair expense splitting for all.
            </p>
            <Button variant='link' className='p-0 text-[#FF8E8E]'>
              Learn More →
            </Button>
          </div>
          <div>
            <img
              src='/src/assets/expense-management.jpg'
              alt='People managing expenses'
              className='rounded-lg w-full h-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementFeature;
