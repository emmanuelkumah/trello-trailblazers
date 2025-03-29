const FeaturesSection = () => {
  return (
    <section className='py-16 px-8'>
      <h2 className='text-3xl font-semibold text-center'>
        Explore Our Key Features
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-8'>
        <div className='p-6 shadow rounded-xl bg-white'>
          <h3 className='text-xl font-semibold'>Detailed Expense Tracking</h3>
          <p className='text-gray-500'>View all transactions at a glance.</p>
        </div>
        <div className='p-6 shadow rounded-xl bg-white'>
          <h3 className='text-xl font-semibold'>Payment Status Monitoring</h3>
          <p className='text-gray-500'>
            Keep track of pending and settled payments.
          </p>
        </div>
        <div className='p-6 shadow rounded-xl bg-white'>
          <h3 className='text-xl font-semibold'>Visualize Your Spending</h3>
          <p className='text-gray-500'>
            Get insights with easy-to-read charts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
