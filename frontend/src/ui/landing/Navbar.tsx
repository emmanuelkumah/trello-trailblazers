import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <header className='bg-[#FFE8E8] py-4'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-medium'>Divvy</div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <a href='#' className='text-gray-700 hover:text-light-red'>
              How It Works
            </a>
            <a href='#features' className='text-gray-700 hover:text-light-red'>
              Features
            </a>
            <a href='#' className='text-gray-700 hover:text-light-red'>
              Contact
            </a>
            <a href='#testimonials' className='text-gray-700 hover:text-light-red'>
              Testimonials
            </a>
          </nav>

          <div className='hidden md:block'>
            <Button
              type="button"
              aria-label="Sign Up Button"
              aria-labelledby="Sign Up"
              role="link"
              className='bg-light-red hover:bg-[#FF7070] text-white rounded-full px-6'
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-700'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                animate={{ rotate: '180deg' }}
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </motion.svg>
            ) : (
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                animate={{ rotate: '0deg' }}
              >
                <line x1='3' y1='12' x2='21' y2='12'></line>
                <line x1='3' y1='6' x2='21' y2='6'></line>
                <line x1='3' y1='18' x2='21' y2='18'></line>
              </motion.svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className='md:hidden mt-4 pb-4'
            variants={variants}
            initial={false}
            animate={mobileMenuOpen ? 'visible' : 'hidden'}
          >
            <nav className='flex flex-col space-y-4'>
              <a href='#' className='text-gray-700 hover:text-light-red'>
                How It Works
              </a>
              <a href='#features' className='text-gray-700 hover:text-light-red'>
                Features
              </a>
              <a href='#' className='text-gray-700 hover:text-light-red'>
                Contact
              </a>
              <a href='#testimonials' className='text-gray-700 hover:text-light-red'>
                Testimonials
              </a>
              <Button
                type="button"
                aria-label="Sign Up Button"
                aria-labelledby="Sign Up"
                role="link"
                className='bg-light-red hover:bg-[#FF7070] text-white rounded-full w-full'
                onClick={() => navigate("/auth")}
              >
                Sign Up
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
