import expenseManagementImage from '@/assets/img/expense-management.jpeg';
import Image from '@/components/Image';

const ManagementFeature = () => {
  return (
    <section className='py-16 bg-[#FFF8E8]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h2 className='text-3xl font-normal mb-3'>
              Effortless Expense Management: Track, Split, and Settle with Ease
            </h2>
            <p className='mb-4 text-base'>
              Divvy simplifies the way you manage shared expenses, allowing you
              to add, split, and track costs effortlessly. With our intuitive
              platform, settling up with friends or family has never been
              easier.
            </p>
          </div>
          <div>
            <Image
              src={expenseManagementImage}
              width={0}
              height={0}
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
