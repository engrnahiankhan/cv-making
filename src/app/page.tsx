"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function generateSlug() {
  const timestamp = Date.now().toString(36); //
  const randomStr = Math.random().toString(36).substring(2, 6);
  return `xyz-${timestamp}-${randomStr}`;
}

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    const slug = generateSlug();
    router.push(`/create-cv/${slug}`);
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white">
      <div className="flex gap-6 flex-col-reverse lg:flex-row items-center justify-center max-w-7xl w-full">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/cv-home.png"
            alt="cv-home-image"
            width={500}
            height={500}
            className="w-full max-w-sm sm:max-w-[500px] h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left flex-1 space-y-7">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[80px] text-main leading-[124%]">
            Create Your <span className="text-prime">AI-Powered Resume</span>
          </h1>

          <p className="font-medium text-main text-base sm:text-lg md:text-xl">
            Let our AI technology help you build a professional resume tailored{" "}
            <br />
            to your skills, experience, and career goals.
          </p>

          <p className="font-normal text-subtle text-sm sm:text-base md:text-lg">
            Follow these simple steps to create a standout resume that will get
            you <br /> noticed by top employers.
          </p>

          <Button
            onClick={handleStart}
            className="rounded-[6px] bg-prime py-3 px-6 font-medium text-base sm:text-lg">
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
