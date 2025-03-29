import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='bg-[#FFE8E8] py-4'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-bold'>Divvy</div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
              How It Works
            </a>
            <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
              Features
            </a>
            <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
              Contact
            </a>
            <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
              Testimonials
            </a>
          </nav>

          <div className='hidden md:block'>
            <Button className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full px-6'>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-700'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='3' y1='12' x2='21' y2='12'></line>
                <line x1='3' y1='6' x2='21' y2='6'></line>
                <line x1='3' y1='18' x2='21' y2='18'></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden mt-4 pb-4'>
            <nav className='flex flex-col space-y-4'>
              <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
                How It Works
              </a>
              <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
                Features
              </a>
              <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
                Contact
              </a>
              <a href='#' className='text-gray-700 hover:text-[#FF8E8E]'>
                Testimonials
              </a>
              <Button className='bg-[#FF8E8E] hover:bg-[#FF7070] text-white rounded-full w-full'>
                Sign Up
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
