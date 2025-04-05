import React from "react";
import Link from "next/link";
import Image from "next/image";

const DownloadApp: React.FC = () => {
  return (
    <section className="relative bg-white py-10 min-h-96 pl-24">
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between mt-16">
        {/* Left Section */}
        <div className="md:w-1/2 pl-10">
          <h1 className="text-5xl font-bold text-green-900 leading-tight font-cormant">
            Download the Krishi Sathi <br /> Mobile App
          </h1>
          <p className="mt-6 text-gray-700 text-lg font-serif">
            Track your Crops all the time and stay carefree about your crops. Get the latest updates on weather, market prices, and farming techniques.
          </p>
          <button className="mt-10 px-6 py-3 bg-black text-white rounded-full transition-transform transform hover:scale-105 hover:bg-green-600 hover:text-white shadow-lg mr-10">
            <Link href="/get_started" className="transition-colors flex items-center">
              <Image src="/icons/GoglePlay.svg" alt="Google Play" width={24} height={24} className="mr-2" />
              Google Play
            </Link>
          </button>
          <button className="mt-10 px-6 py-3 bg-black text-white rounded-full transition-transform transform hover:scale-105 hover:bg-green-600 hover:text-white shadow-lg">
            <Link href="/get_started" className="transition-colors flex items-center">
              <Image src="/icons/AppStore.svg" alt="App Store" width={24} height={24} className="mr-2" />
              App Store
            </Link>
          </button>
        </div>

        {/* Right Section */}
        <div className="mt-10 md:mt-0 md:w-1/2 relative pl-48">
          <img src="/images/Phone.png" alt="Phone Image" className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
