const FeaturesSection = () => {
  return (
    <section className='py-16 px-6 lg:px-16 bg-gray-50'>
      <h2 className='text-3xl font-semibold text-center text-gray-900'>
        Explore Our Key Features
      </h2>
      <div className='grid md:grid-cols-3 gap-8 mt-8'>
        <div className='p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center'>
          <h3 className='text-xl font-semibold text-gray-800'>
            📊 Detailed Expense Tracking
          </h3>
          <p className='mt-2 text-gray-500'>
            View all transactions at a glance.
          </p>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center'>
          <h3 className='text-xl font-semibold text-gray-800'>
            💳 Payment Status Monitoring
          </h3>
          <p className='mt-2 text-gray-500'>
            Track pending and settled payments.
          </p>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center'>
          <h3 className='text-xl font-semibold text-gray-800'>
            📈 Visualize Your Spending
          </h3>
          <p className='mt-2 text-gray-500'>
            Gain insights with easy-to-read charts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
