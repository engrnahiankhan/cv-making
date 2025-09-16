import { Progress } from "../ui/progress";

const AiStep = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          AI Resume Magic
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Now, let’s turn all the information you’ve provided into a
          professional resume! Our AI will generate a polished version that{" "}
          <br /> showcases your strengths and matches industry standards.
        </p>
      </div>

      <div>
        <span className="font-medium text-xl text-[#101010] ">
          AI is refining your resume...
        </span>

        <Progress value={30} className="w-full h-4 mt-2 rounded-[50px]" />
      </div>
    </div>
  );
};

export default AiStep;
