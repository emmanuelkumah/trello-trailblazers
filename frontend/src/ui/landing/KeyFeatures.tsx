import { Button } from '@/components/ui/button';

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='m21.406 6.086l-9-4a1 1 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035c-.028.014-.058.023-.084.04c-.022.015-.039.034-.06.05a.9.9 0 0 0-.19.194q-.031.04-.059.081a1 1 0 0 0-.076.165c-.009.027-.023.052-.031.079A1 1 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a1 1 0 0 0 .402-.096l.004.01l9-4A1 1 0 0 0 22 17V7a1 1 0 0 0-.594-.914M12 4.095L18.538 7L12 9.905l-1.308-.581L5.463 7zm1 15.366V11.65l7-3.111v7.812z'
    ></path>
  </svg>
);

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='rounded-full mb-3 flex items-center justify-center'>
        <div className='flex items-center justify-center'>{icon}</div>
      </div>
      <h3 className='font-semibold text-lg mb-2'>{title}</h3>
      <p className='text-sm text-gray-700 mb-3'>{description}</p>
      <Button variant='link' className='p-0 text-[#FF8E8E]'>
        Learn More →
      </Button>
    </div>
  );
};

const KeyFeatures = () => {
  return (
    <section className='py-16 bg-white' id='features'>
      <div className='container mx-auto px-4'>
        <p className='text-sm text-gray-900 mb-4 text-center font-medium'>
          Features
        </p>
        <h2 className='text-2xl font-bold text-center mb-6'>
          Explore Our Key Features
        </h2>
        <p className='text-sm text-gray-700 mb-8 text-center'>
          Manage expenses effortlessly with our intuitive tools.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <FeatureItem
            icon={<Icon />}
            title='Detailed Expense Tracking'
            description='Keep track of every expense and never lose sight of your financial activities.'
          />
          <FeatureItem
            icon={<Icon />}
            title='Payment Status Dashboard'
            description='Monitor all payment statuses in one central location for maximum convenience.'
          />
          <FeatureItem
            icon={<Icon />}
            title='Instant Push Notifications'
            description='Stay updated with real-time alerts about group activities and payment reminders.'
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
