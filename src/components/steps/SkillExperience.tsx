"use client";

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
import { CalendarDays, ChevronRight, CloudUpload, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useFormActions } from "@/hooks/useFormAction";
import { skillAndExperience } from "@/utils/initialForm";

const SkillExperience = () => {
  const { formState, updateSkillExperience, addSkillExperience } =
    useFormActions();
  const data = formState.formData.skill_and_experience;
  const [openStartDate, setOpenStartDate] = useState<number | null>(null);
  const [openEndDate, setOpenEndDate] = useState<number | null>(null);

  const [skillInputs, setSkillInputs] = useState<Record<number, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSkill = (id: number, currentSkills: string[]) => {
    const skillInput = skillInputs[id]?.trim() || "";
    if (!skillInput) return;

    const exp = formState.formData.skill_and_experience.find(
      (exp) => exp.id === id
    );
    if (!exp) return;

    const updated = [...currentSkills, skillInput];

    updateSkillExperience(id, {
      skill: {
        value: updated,
        error: exp.skill?.error || "",
        require: exp.skill?.require || false,
      },
    });

    setSkillInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const removeSkill = (
    id: number,
    currentSkills: string[],
    skillToRemove: string
  ) => {
    const exp = formState.formData.skill_and_experience.find(
      (exp) => exp.id === id
    );
    if (!exp) return;

    const updated = currentSkills.filter((s) => s !== skillToRemove);

    updateSkillExperience(id, {
      skill: {
        value: updated,
        error: exp.skill?.error || "",
        require: exp.skill?.require || false,
      },
    });
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    id: number,
    currentSkills: string[]
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(id, currentSkills);
    }
  };

  const handleSkip = () => {
    skillAndExperience();
  };

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-5xl font-semibold text-main">
              Your Work Experience & Skills
            </h1>
            <button
              onClick={handleSkip}
              className="bg-[#F5F5F5] sm:py-2 py-1.5 sm:px-5 px-3 gap-1 sm:gap-3 text-[#101010] font-medium text-base sm:text-xl rounded-[8px] flex items-center hover:bg-gray-200 cursor-pointer transition-colors">
              Skip <ChevronRight />
            </button>
          </div>

          <p className="text-subtle text-base sm:text-lg font-normal">
            Highlight your work experience and skills. The more detail you
            provide, the better the AI can tailor <br /> your resume to match
            job opportunities.
          </p>
        </div>

        {data?.map((exp) => (
          <div key={exp.id} className="space-y-8">
            {/* Job title and Company Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${exp.id}`}
                  value={exp.job_title.value || ""}
                  onChange={(e) =>
                    updateSkillExperience(exp.id, {
                      job_title: { ...exp.job_title, value: e.target.value },
                    })
                  }
                  placeholder="Enter your job title"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`companyName-${exp.id}`}>Company Name</Label>
                <Input
                  id={`companyName-${exp.id}`}
                  value={exp.company_name.value || ""}
                  onChange={(e) =>
                    updateSkillExperience(exp.id, {
                      company_name: {
                        ...exp.company_name,
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            {/* Job Duration */}
            <div className="space-y-1">
              <Label htmlFor={`job-duration-${exp.id}`}>Duration</Label>
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
                        setOpenEndDate(null);
                        if (date) {
                          updateSkillExperience(exp.id, {
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
                          updateSkillExperience(exp.id, {
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

            {/* Job Description */}
            <div className="space-y-1">
              <Label htmlFor={`jobDescription-${exp.id}`}>
                Job Description/Responsibilities
              </Label>
              <Textarea
                id={`jobDescription-${exp.id}`}
                value={exp.job_description.value || ""}
                onChange={(e) =>
                  updateSkillExperience(exp.id, {
                    job_description: {
                      ...exp.job_description,
                      value: e.target.value,
                    },
                  })
                }
                placeholder="Describe your key responsibilities and achievements"
                className="h-[200px] resize-none"
              />
            </div>

            {/* Achievement and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Achievements */}
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
                        updateSkillExperience(exp.id, {
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

              {/* Skills */}
              <div className="space-y-0.5">
                <Label htmlFor={`skills-${exp.id}`}>Skills</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={skillInputs[exp.id] || ""}
                      onChange={(e) =>
                        setSkillInputs((prev) => ({
                          ...prev,
                          [exp.id]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(e, exp.id, exp.skill.value)
                      }
                      placeholder="Add a skill"
                      className="!h-10 !px-4 text-base"
                    />
                    <Button
                      onClick={() => addSkill(exp.id, exp.skill.value)}
                      size="icon"
                      className="px-3 !rounded-[6px">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.skill?.value.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-sm capitalize">
                        {skill}
                        <button
                          onClick={() =>
                            removeSkill(exp.id, exp.skill.value, skill)
                          }
                          className="ml-2 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b-[2px] border-[#E0E0E0] w-full" />
          </div>
        ))}
      </div>

      <button
        className="font-medium text-xl text-prime hover:text-green-600 transition-colors flex items-center gap-3 cursor-pointer duration-200 pt-6"
        onClick={() => addSkillExperience()}>
        <Plus className="w-6 h-6" />
        Add Another Work Experience
      </button>
    </>
  );
};

export default SkillExperience;
