import secureAccountImage from '@/assets/img/secure-account.jpeg';

const AccountFeature = () => {
  return (
    <section className='py-10 bg-[#FFE8E8]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
            <h2 className='text-4xl mb-2 font-normal'>
              Secure Your Account with Easy Signup and Hassle-Free Login
            </h2>
            <p className='mb-4 font-sarabun text-base'>
              Divvy prioritizes your security with a straightforward signup
              process. Create your account using your email and a password,
              ensuring your information is safe. Once registered, logging in is
              quick and easy, allowing you to access your groups and expenses
              instantly.
            </p>
          </div>
          <div>
            <img
              src={secureAccountImage}
              alt='Person using the app on a phone'
              className='rounded-lg w-full h-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountFeature;
