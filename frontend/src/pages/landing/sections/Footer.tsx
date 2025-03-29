const Footer = () => {
  return (
    <footer className='bg-[#753434] text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h2 className='text-xl font-bold mb-4'>Divvy</h2>
            <p className='text-sm opacity-80'>
              Simplifying expense sharing for friends, roommates, and groups
              since 2020.
            </p>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>About</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Our Story
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Press
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Support</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Connect</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Twitter
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='#' className='text-sm opacity-80 hover:opacity-100'>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-white border-opacity-20 mt-8 pt-8 text-sm opacity-70 text-center md:text-left'>
          © {new Date().getFullYear()} Divvy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
