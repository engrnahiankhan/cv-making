"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const steps = [
  {
    id: 1,
    number: "01",
    title: "Personal Information",
  },
  {
    id: 2,
    number: "02",
    title: "Career Summary",
  },
  {
    id: 3,
    number: "03",
    title: "Skills & Experience",
  },
  {
    id: 4,
    number: "04",
    title: "Education & Certifications",
  },
  {
    id: 5,
    number: "05",
    title: "Contact Information",
  },
  {
    id: 6,
    number: "06",
    title: "AI Resume Generation",
  },
  {
    id: 7,
    number: "07",
    title: "Review & Download",
  },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
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
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}></div>

            {/* Step circles */}
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300",
                        isActive && "bg-prime text-white",
                        isCompleted && "bg-prime text-white",
                        !isActive && !isCompleted && "bg-[#E8E8E8] text-main"
                      )}>
                      {step.number}
                    </div>
                    <div className="text-center mt-3 max-w-24">
                      <p
                        className={cn(
                          "text-base font-medium leading-[150%]",
                          isActive && "text-main",
                          !isActive && "text-subtle"
                        )}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-[120px]">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-gray-900">
                  Tell Us About Yourself
                </h1>
                <p className="text-gray-600 text-lg">
                  Fill in your personal details so we can tailor your resume
                  perfectly to your career goals.
                </p>
              </div>

              <div className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-900">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      placeholder="Saifur"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-900">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      placeholder="Rahman"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                </div>

                {/* Phone Number and Email Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-900">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+880 1567808747"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="ux.saifur.info@gmail.com"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                </div>

                {/* Country/Region and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-900">
                      Country/Region
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        updateFormData("country", value)
                      }>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0">
                        <SelectValue placeholder="Bangladesh" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-900">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      placeholder="Section-06, Mirpur, Dhaka."
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                </div>

                {/* City, State, ZIP Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-900">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Dhaka"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-900">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      placeholder="Dhaka"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="zipCode"
                      className="text-sm font-medium text-gray-900">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        updateFormData("zipCode", e.target.value)
                      }
                      placeholder="1216"
                      className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={nextStep}
                  className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-medium text-base rounded-lg flex items-center justify-center gap-2">
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {currentStep > 1 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-600 mb-8">
                This step is coming soon. The form structure is ready for
                implementation.
              </p>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                {currentStep === steps.length ? "Complete" : "Next Step"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
