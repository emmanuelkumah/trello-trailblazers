import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className='py-16 bg-gray-900 text-white text-center'>
      <h2 className='text-3xl font-semibold'>
        Start Managing Your Expenses Today
      </h2>
      <p className='mt-4 text-lg'>
        Join thousands of users simplifying their group expenses.
      </p>
      <Button className='mt-6 bg-red-500 text-white px-6 py-3 rounded-lg'>
        Sign Up Now
      </Button>
    </section>
  );
};

export default CTASection;
