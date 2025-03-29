import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className='py-12 bg-[#FFE8E8]'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-2xl font-bold mb-4'>
          Start Managing Your Expenses Today
        </h2>
        <p className='mb-6 max-w-xl mx-auto'>
          Join thousands of users enjoying stress-free expense management.
          Signup now to experience the difference.
        </p>
        <Button className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full px-8'>
          Sign Up
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
