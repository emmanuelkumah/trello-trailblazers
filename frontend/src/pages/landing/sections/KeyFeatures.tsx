import { Button } from '@/components/ui/button';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='bg-black rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center'>
        {icon}
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
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl font-bold text-center mb-12'>
          Explore Our Key Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <FeatureItem
            icon={<span className='text-white'>🔎</span>}
            title='Detailed Expense Tracking'
            description='Keep track of every expense and never lose sight of your financial activities.'
          />
          <FeatureItem
            icon={<span className='text-white'>📊</span>}
            title='Payment Status Dashboard'
            description='Monitor all payment statuses in one central location for maximum convenience.'
          />
          <FeatureItem
            icon={<span className='text-white'>📱</span>}
            title='Instant Push Notifications'
            description='Stay updated with real-time alerts about group activities and payment reminders.'
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
