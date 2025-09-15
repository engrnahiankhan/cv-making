"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PersonalInfo from "@/components/features/PersonalInfo";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { nextStep, resetForm } from "@/redux/slices/formSlice";
import CareerSummary from "@/components/features/CareerSummary";
import { ChevronRight } from "lucide-react";

const steps = [
  { id: 1, number: "01", title: "Personal Information" },
  { id: 2, number: "02", title: "Career Summary" },
  { id: 3, number: "03", title: "Skills & Experience" },
  { id: 4, number: "04", title: "Education & Certifications" },
  { id: 5, number: "05", title: "Contact Information" },
  { id: 6, number: "06", title: "AI Resume Generation" },
  { id: 7, number: "07", title: "Review & Download" },
];

const MultiStepForm = () => {
  const dispatch = useAppDispatch();
  const { step, data } = useAppSelector((state) => state.form);

  const handleSubmit = () => {
    console.log("✅ Final Submitted Data:", data);
    alert("Check console for submitted data");
    dispatch(resetForm());
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-6 left-0 right-0 h-[5px] bg-[#E8E8E8]"></div>

            {/* Progress line */}
            <div
              className="absolute top-6 left-0 h-[5px] bg-green-500 transition-all duration-500"
              style={{
                width: `${((step - 1) / (steps.length - 1)) * 100}%`,
              }}></div>

            {/* Step circles */}
            <div className="relative flex justify-between">
              {steps.map((s) => {
                const isActive = step === s.id;
                const isCompleted = step > s.id;

                return (
                  <div key={s.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300",
                        isActive && "bg-prime text-white",
                        isCompleted && "bg-prime text-white",
                        !isActive && !isCompleted && "bg-[#E8E8E8] text-main"
                      )}>
                      {s.number}
                    </div>
                    <div className="text-center mt-3 max-w-24">
                      <p
                        className={cn(
                          "text-base font-medium leading-[150%]",
                          isActive && "text-main",
                          !isActive && "text-subtle"
                        )}>
                        {s.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-[120px]">
          {step === 1 && <PersonalInfo />}
          {step === 2 && <CareerSummary />}

          <div className="pt-8">
            {step < 6 ? (
              <Button
                onClick={() => dispatch(nextStep())}
                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-medium text-base rounded-lg flex items-center justify-center gap-2">
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-medium text-base rounded-lg flex items-center justify-center gap-2">
                Generate Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
