import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className='py-12 bg-[#663838] text-white'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-4xl font-normal mb-4'>
          Start Managing Your Expenses Today
        </h2>
        <p className='mb-6 max-w-xl mx-auto text-base'>
          Join Divvy now to simplify your group expenses and enjoy hassle-free
          settlements with friends.
        </p>
        <Button
          className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full px-8'
          onClick={() => navigate("/auth")}
        >
          Sign Up
        </Button>
        <Button
          className='bg-transparent border border-white text-white hover:bg-white hover:text-[#663838] rounded-full px-8 ml-4'
          onClick={() => navigate("/auth")}
        >
          Login
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
