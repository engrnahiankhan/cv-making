import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { updateSkillExperienceForm } from "@/redux/slices/formSlice";
import { SkillAndExperience } from "@/types/formTypes";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, CloudUpload, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const SkillExperience = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "UI Designer",
    "UX Designer",
    "Figma",
  ]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleChange = (
    id: number,
    field: keyof SkillAndExperience,
    value: string | string[]
  ) => {
    dispatch(updateSkillExperienceForm({ id, field, value }));
  };
  return (
    <div className="space-y-8">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          Your Work Experience & Skills
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Highlight your work experience and skills. The more detail you
          provide, the better the AI can tailor your resume to match job
          opportunities.
        </p>
      </div>

      {data.skill_and_experience?.map((exp) => (
        <div key={exp.id} className="space-y-8">
          {/* Job title and Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
              <Input
                id={`jobTitle-${exp.id}`}
                value={exp.job_title || ""}
                onChange={(e) =>
                  handleChange(exp.id, "job_title", e.target.value)
                }
                placeholder="Enter your job title"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`companyName-${exp.id}`}>Company Name</Label>
              <Input
                id={`companyName-${exp.id}`}
                value={exp.company_name || ""}
                onChange={(e) =>
                  handleChange(exp.id, "company_name", e.target.value)
                }
                placeholder="Enter your company name"
              />
            </div>
          </div>

          {/* Job Duration */}
          <div className="space-y-1">
            <Label htmlFor={`job-duration-${exp.id}`}>Duration</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                    <CalendarDays className="text-subtle w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setStartDate(date);
                      setOpenStartDate(false);

                      if (date) {
                        handleChange(exp.id, "start_date", date.toISOString());
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                    <CalendarDays className="text-subtle w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setEndDate(date);
                      setOpenEndDate(false);
                      if (date) {
                        handleChange(exp.id, "end_date", date.toISOString());
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
              value={exp.job_description || ""}
              onChange={(e) =>
                handleChange(exp.id, "job_description", e.target.value)
              }
              placeholder="Describe your key responsibilities and achievements"
              className="h-[200px] resize-none"
            />
          </div>

          {/* Achievement and Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-900">
                Achievements
              </Label>
              <div className="border border-[#D4D4D4] rounded-[8px] p-8 text-center bg-[#FCFCFD] hover:bg-gray-100 transition-colors">
                <CloudUpload className="w-8 h-8 text-[#333333] mx-auto mb-3" />
                <p className="text-[#333333] font-normal text-lg mb-1">
                  Drop file or browse
                </p>
                <p className="text-base text-[#BABABA]">
                  Format: .jpeg, .png & Max file size: 25 MB
                </p>
                <Button
                  variant="secondary"
                  className="mt-2 bg-subtle hover:bg-gray-600 text-white text-sm font-normal tracking-[1px]">
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="space-y-0.5">
              <Label htmlFor={`skills-${exp.id}`}>Skills</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill"
                    className="!h-10 !px-4 text-base"
                  />
                  <Button onClick={addSkill} size="icon" className="px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-sm capitalize">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillExperience;
