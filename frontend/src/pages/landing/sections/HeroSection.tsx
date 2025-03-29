import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-20 bg-pink-100">
      <h1 className="text-4xl font-bold">Effortless Expense Sharing for Every Occasion</h1>
      <p className="mt-4 text-lg text-gray-600">
        Manage group expenses with ease. Split costs and settle seamlessly.
      </p>
      <div className="mt-6">
        <Button className="mr-4">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
};

export default HeroSection;
