import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-pink-100 py-20 px-6 lg:px-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900">
          Effortless Expense Sharing for Every Occasion
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Every splitting scenario, from travel to daily expenses, made easy.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="bg-[#FF8E8E] text-white px-6 py-3 rounded-lg">
            Get Started
          </Button>
          <Button variant="outline" className="border-gray-500 text-gray-700 px-6 py-3 rounded-lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
