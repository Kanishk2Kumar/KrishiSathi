import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[75vh]">
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between mt-16">
        {/* Left Section */}
        <div className="md:w-1/2 pl-10">
          <h1 className="text-5xl font-bold leading-tight font-cormorant-garamond">
          Krishi Sathi <br />
            <span className="text-green-800 mt-1">किसान की हर मुश्किल का हल।</span>
          </h1>
          <p className="mt-6 mr-20 text-gray-500 text-lg font-serif">
          <span className="border-b-2 border-dashed border-green-500">Krishi Sathi</span>  is a smart farming initiative empowering farmers through innovation, technology, and personalized support. By combining AI, IoT, and real-time insights, we help farmers make better decisions, improve crop health, and increase profits. With voice-based assistance in local languages and direct market access, Krishi Saathi ensures no farmer is left behind. Join us in transforming agriculture for a smarter, more sustainable future.
          </p>

          <button className="mt-10 px-6 py-3 text-green-800 rounded-md transition-transform transform hover:scale-105 hover:bg-green-900 hover:text-white">
            <Link href="/learn-more" className="transition-colors">
              Learn More
            </Link>
          </button>
        </div>

        <div className=" md:mt-0 md:w-1/2 relative pl-56">
          <img
            src="/images/Hero2.jpeg"
            alt="Hero Image"
            className="hidden md:block animate-slide-in-right rounded-xl"
            width={420}
            height="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
