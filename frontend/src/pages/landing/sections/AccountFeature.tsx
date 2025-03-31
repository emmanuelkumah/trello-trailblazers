const AccountFeature = () => {
  return (
    <section className='py-16 bg-[#FFE8E8]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
            <h2 className='text-2xl font-bold mb-3'>
              Secure Your Account with Easy Signup and Hassle-Free Login
            </h2>
            <p className='mb-4'>
              Enjoy peace of mind with a straightforward signup process. Secure
              your personal and payment information with our advanced encryption
              and protection measures, ensuring a safe and seamless financial
              experience.
            </p>
          </div>
          <div>
            <img
              src='/src/assets/img/secure-account.jpeg'
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
