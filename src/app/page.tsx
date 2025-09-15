import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="">
          <Image
            src="/cv-home.png"
            alt="cv-home-image"
            width={10000}
            height={10000}
            className="max-w-[500px] w-full h-auto"
          />
        </div>

        <div className="">
          <h1 className="font-bold text-[80px] text-main">
            Create Your <span className="text-primary">AI-Powered Resume</span>
          </h1>

          <p className="font-medium text-main text-2xl">
            Let our AI technology help you build a professional resume tailored
            to your skills, experience, and career goals.
          </p>

          <p className="font-normal text-subtle text-lg">
            Follow these simple steps to create a standout resume that will get
            you noticed by top employers.
          </p>
        </div>
      </div>
    </div>
  );
}
