import Image from "next/image";
import Path from "@/components/Path";
import ThreeStepProcess from "@/components/ThreeStepProcess";
import WhyJVA from "@/components/WhyJVA";

import banner from "../assets/334100-Real-estate-outlook-hero-1380x800px_.jpg"
import banner2 from "../assets/Importance-of-Real-Estate-Market-Analysis-1024x683.jpg"

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-24 py-32 ">
      {/* Hero Section */}
      <main className="relative flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-5xl w-full gap-12">
        {/* Left Side (Text) */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 lg:mb-4">
            Where Land Meets{" "}
            <span className="text-yellow-400">Capital & Vision</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg lg:text-xl mb-8 lg:mb-10 max-w-md lg:max-w-lg">
            Connect landowners, individual & group investors, cooperatives,
            government entities, and mandates for profitable real estate joint
            ventures. We manage the process, you reap the rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs lg:max-w-md">
            <a
              href="#get-started"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow transition-colors flex items-center justify-center"
            >
              Get Started Today &rarr;
            </a>
            <a
              href="#how-it-works"
              className="border border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn How It Works
            </a>
          </div>
        </div>
        {/* Right Side (Overlapping Images for Desktop) */}
        <div className="hidden lg:block w-1/2 relative min-h-[400px]">
          {/* Background Image (blurred/dimmed) */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <Image
              src={banner2}
              alt="Real Estate Market Analysis"
              fill
              className="object-cover w-full h-full blur-[2px] opacity-70"
              style={{ zIndex: 1 }}
              priority
            />
          </div>
          {/* Foreground Image (bottom right, on top) */}
          <div className="absolute bottom-0 right-0 z-10 drop-shadow-2xl">
            <Image
              src={banner}
              alt="Real Estate Joint Venture"
              width={260}
              height={180}
              className="rounded-xl object-cover border-4 border-white"
              priority
            />
          </div>
          {/* Spacer for layout */}
          <div className="w-full h-[400px]" />
        </div>
      </main>
    </div>
    <Path />
    <ThreeStepProcess />
    <WhyJVA />
    </>
  );
}
