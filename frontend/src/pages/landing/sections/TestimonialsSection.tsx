const testimonials = [
  {
    name: 'Jane Doe',
    feedback:
      'This app changed how I manage group expenses. Super easy and efficient!',
  },
  {
    name: 'John Smith',
    feedback: 'Finally, a simple and transparent way to track shared payments!',
  },
  {
    name: 'Aisha Khan',
    feedback: 'The best expense-sharing app I’ve used! Highly recommended!',
  },
];

const TestimonialsSection = () => {
  return (
    <section className='py-16 bg-gray-100'>
      <h2 className='text-3xl font-semibold text-center'>What Our Users Say</h2>
      <div className='mt-8 grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map((testimonial, index) => (
          <div key={index} className='p-6 bg-white shadow-md rounded-xl'>
            <p className='text-gray-700'>"{testimonial.feedback}"</p>
            <h4 className='mt-4 text-lg font-semibold'>{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
