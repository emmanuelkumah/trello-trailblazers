import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className='py-16 bg-blue-600 text-white text-center'>
      <h2 className='text-3xl font-semibold'>Get Started Today</h2>
      <p className='mt-4 text-lg'>
        Join thousands of users simplifying their group expenses.
      </p>
      <Button className='mt-6 bg-white text-blue-600 hover:bg-gray-200'>
        Sign Up Now
      </Button>
    </section>
  );
};

export default CTASection;
