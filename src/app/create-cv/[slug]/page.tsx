"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PersonalInfo from "@/components/steps/PersonalInfo";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  nextStep,
  prevStep,
  resetForm,
  updateSlugAction,
} from "@/redux/slices/formSlice";
import CareerSummary from "@/components/steps/CareerSummary";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SkillExperience from "@/components/steps/SkillExperience";
import EduCertificate from "@/components/steps/edu-certificate/EduCertificate";
import ContactInfo from "@/components/steps/ContactInfo";
import AiStep from "@/components/steps/AiStep";
import usePreserveData from "@/hooks/usePreserveData";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ReviewDownload from "@/components/steps/review-download/ReviewDownload";

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
  usePreserveData("formState");
  const params = useParams();
  const slug = params.slug;
  const dispatch = useAppDispatch();
  const { step, data } = useAppSelector((state) => state.form);

  useEffect(() => {
    if (slug) {
      dispatch(updateSlugAction(String(slug)));
    }
  }, [slug, dispatch]);

  const handleSubmit = () => {
    console.log("Submitted Data:", data);
    dispatch(nextStep());
    // alert("Check console for submitted data");
    // dispatch(resetForm());
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-9 sm:mb-16">
          <div className="relative">
            {/* Background line */}
            <div
              className="absolute top-4 sm:top-6 h-[4px] sm:h-[5px] bg-[#E8E8E8]"
              style={{ left: "24px", right: "24px" }}></div>

            {/* Progress line */}
            <div
              className="absolute top-4 sm:top-6 h-[4px] sm:h-[5px] bg-prime transition-all duration-500"
              style={{
                left: "24px",
                width:
                  step > 1
                    ? `${
                        ((step - 1) / (steps.length - 1)) *
                        (100 - 48 / steps.length)
                      }%`
                    : "0%",
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
                        "sm:w-12 w-8 sm:h-12 h-8 rounded-full flex items-center justify-center text-sm sm:text-lg font-medium transition-all duration-300",
                        isActive && "bg-prime text-white",
                        isCompleted && "bg-prime text-white",
                        !isActive && !isCompleted && "bg-[#E8E8E8] text-main"
                      )}>
                      {s.number}
                    </div>
                    <div className="text-center mt-3 max-w-24 hidden sm:block">
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

        <div className="px-5 sm:px-[60px] lg:px-[120px]">
          {step === 1 && <PersonalInfo />}
          {step === 2 && <CareerSummary />}
          {step === 3 && <SkillExperience />}
          {step === 4 && <EduCertificate />}
          {step === 5 && <ContactInfo />}
          {step === 6 && <AiStep />}
          {step === 7 && <ReviewDownload />}

          <div className="pt-8 md:pt-12">
            {step < 6 ? (
              <div className="flex items-center justify-between">
                <Button
                  size="res"
                  onClick={() => dispatch(prevStep())}
                  disabled={step === 1}>
                  <ArrowLeft className="w-6 h-6" />
                  Previous
                </Button>
                <Button size="res" onClick={() => dispatch(nextStep())}>
                  Next
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Button size="res" onClick={() => dispatch(prevStep())}>
                  <ArrowLeft className="w-6 h-6" />
                  Previous
                </Button>
                <Button
                  size="res"
                  onClick={handleSubmit}
                  className="w-[200px] h-[56px] bg-prime hover:bg-green-600 text-white font-medium text-base rounded-[6px] flex items-center justify-center gap-2 py-[11px] px-[24px] transition-colors">
                  Generate Resume
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
