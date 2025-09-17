import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, CloudUpload, Plus } from "lucide-react";
import { useFormActions } from "@/hooks/useFormAction";

const Education = () => {
  const { formState, updateEducation, addEducation, updateToggle } =
    useFormActions();
  const data = formState.formData.education;
  const [openStartDate, setOpenStartDate] = useState<number | null>(null);
  const [openEndDate, setOpenEndDate] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-5xl font-semibold text-main">
              Your Educational Background
            </h1>
            <button
              onClick={() => updateToggle("certificate")}
              className="bg-main py-2 px-5 gap-3 text-white font-medium text-base rounded-[6px] flex items-center hover:bg-black cursor-pointer transition-colors">
              Certifications
            </button>
          </div>

          <p className="text-subtle text-base sm:text-lg font-normal">
            Provide your academic qualifications and any relevant certifications
            to strengthen your resume.
          </p>
        </div>

        {data.map((exp) => (
          <div key={exp.id} className="space-y-8">
            {/* Degree */}
            <div className="space-y-1">
              <Label htmlFor={`degree-${exp.id}`}>Your Degree</Label>
              <Input
                id={`degree-${exp.id}`}
                value={exp.degree.value || ""}
                onChange={(e) =>
                  updateEducation(exp.id, {
                    degree: { ...exp.degree, value: e.target.value },
                  })
                }
                placeholder="Enter your degree"
              />
            </div>

            {/* Institution Name and Major */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor={`institutionName-${exp.id}`}>
                  Institution Name
                </Label>
                <Input
                  id={`institutionName-${exp.id}`}
                  value={exp.institution_name.value || ""}
                  onChange={(e) =>
                    updateEducation(exp.id, {
                      institution_name: {
                        ...exp.institution_name,
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter your institution name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`major-${exp.id}`}>Major</Label>
                <Input
                  id={`major-${exp.id}`}
                  value={exp.major.value || ""}
                  onChange={(e) =>
                    updateEducation(exp.id, {
                      major: { ...exp.major, value: e.target.value },
                    })
                  }
                  placeholder="Enter your major"
                />
              </div>
            </div>

            {/* Graduation Duration */}
            <div className="space-y-1">
              <Label htmlFor={`graduation-duration-${exp.id}`}>
                Graduation
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Popover
                  open={openStartDate === exp.id}
                  onOpenChange={(isOpen) =>
                    setOpenStartDate(isOpen ? exp.id : null)
                  }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                      {exp.start_date.value
                        ? new Date(exp.start_date.value).toLocaleDateString()
                        : "Start date"}
                      <CalendarDays className="text-subtle w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={
                        exp.start_date.value
                          ? new Date(exp.start_date.value)
                          : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenStartDate(null);
                        if (date) {
                          updateEducation(exp.id, {
                            start_date: {
                              ...exp.start_date,
                              value: date.toISOString(),
                            },
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Popover
                  open={openEndDate === exp.id}
                  onOpenChange={(isOpen) =>
                    setOpenEndDate(isOpen ? exp.id : null)
                  }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                      {exp.end_date.value
                        ? new Date(exp.end_date.value).toLocaleDateString()
                        : "End date"}
                      <CalendarDays className="text-subtle w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={
                        exp.end_date.value
                          ? new Date(exp.end_date.value)
                          : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenEndDate(null);
                        if (date) {
                          updateEducation(exp.id, {
                            end_date: {
                              ...exp.end_date,
                              value: date.toISOString(),
                            },
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-900">
                  Achievements
                </Label>
                <div className="border border-[#D4D4D4] rounded-[8px] p-8 text-center bg-[#FCFCFD] hover:bg-gray-100 transition-colors">
                  <CloudUpload className="w-8 h-8 text-[#333333] mx-auto mb-3" />
                  <p className="text-[#333333] font-normal text-lg mb-1">
                    {exp.achievements.value
                      ? exp.achievements.value
                      : "Drop file or browse"}
                  </p>
                  <p className="text-base text-[#BABABA]">
                    Format: .jpeg, .png & Max file size: 25 MB
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-2 bg-subtle hover:bg-gray-600 text-white text-sm font-normal tracking-[1px] !rounded-[4px]"
                    onClick={() => fileInputRef.current?.click()}>
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateEducation(exp.id, {
                          achievements: {
                            ...exp.achievements,
                            value: file.name,
                          },
                        });
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="border-b-[2px] border-[#E0E0E0] w-full" />
          </div>
        ))}
      </div>

      <button
        className="font-medium text-xl text-prime hover:text-green-600 transition-colors flex items-center gap-3 cursor-pointer duration-200 pt-6"
        onClick={() => addEducation()}>
        <Plus className="w-6 h-6" />
        Add Another Degree
      </button>
    </>
  );
};

export default Education;
