const testimonials = [
  {
    name: 'Alice Johnson',
    feedback:
      "Divvy has transformed the way we manage our group expenses. It's simple, efficient, and has made splitting costs a breeze!",
    company: 'Personal Manager, SwiftPay',
  },
  {
    name: 'John Smith',
    feedback: 'Finally, a simple and transparent way to track shared payments!',
    company: 'Team Lead, ExpenseWise',
  },
  {
    name: 'Aisha Khan',
    feedback: 'The best expense-sharing app I’ve used! Highly recommended!',
    company: 'Financial Consultant, PaySplit',
  },
];

const TestimonialsSection = () => {
  return (
    <section className='py-16 bg-pink-100'>
      <h2 className='text-3xl font-semibold text-center text-gray-900'>
        What Our Users Say
      </h2>
      <div className='mt-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 px-6'>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className='p-6 bg-white shadow-lg rounded-xl text-center flex-1'
          >
            <p className='text-gray-700 text-lg italic'>
              "{testimonial.feedback}"
            </p>
            <h4 className='mt-4 font-semibold text-gray-900'>
              {testimonial.name}
            </h4>
            <p className='text-sm text-gray-500'>{testimonial.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
