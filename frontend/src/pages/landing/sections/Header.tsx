import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white shadow-md w-full top-0 left-0 z-50'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <a href='#' className='text-2xl font-bold text-gray-900'>
          Divvy
        </a>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-8 text-gray-700'>
          <a href='#features' className='hover:text-red-500'>
            Features
          </a>
          <a href='#testimonials' className='hover:text-red-500'>
            Testimonials
          </a>
          <a href='#pricing' className='hover:text-red-500'>
            Pricing
          </a>
          <a href='#contact' className='hover:text-red-500'>
            Contact
          </a>
        </nav>

        {/* Call-to-Action Button */}
        <div className='hidden md:block'>
          <Button className='bg-red-500 text-white px-6 py-2 rounded-lg'>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className='md:hidden bg-white shadow-md py-4 px-6 absolute w-full top-16 left-0'>
          <a href='#features' className='block py-2 hover:text-red-500'>
            Features
          </a>
          <a href='#testimonials' className='block py-2 hover:text-red-500'>
            Testimonials
          </a>
          <a href='#pricing' className='block py-2 hover:text-red-500'>
            Pricing
          </a>
          <a href='#contact' className='block py-2 hover:text-red-500'>
            Contact
          </a>
          <Button className='w-full mt-4 bg-red-500 text-white px-6 py-2 rounded-lg'>
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
